import { useEffect, useRef, useState } from 'react'
import useGetTasksByBrigadeId from '../api/hooks/useGetTasksByBrigadeId'
import InteractiveMap from '../components/core/map'
import LocateControl from '../components/core/LocateControl'
import { LatLngTuple, Map as LeafletMap, LatLngBounds } from 'leaflet'
import { Geolocation } from '@capacitor/geolocation'
import { toast } from 'react-hot-toast'

interface TaskMarker {
  id: string
  position: LatLngTuple
}

const geocodeAddress = async (address: string): Promise<LatLngTuple | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    )
    const data = await response.json()
    if (data && data.length > 0) {
      const { lat, lon } = data[0]
      return [parseFloat(lat), parseFloat(lon)]
    }
    return null
  } catch (error) {
    toast.error('Ошибка при геокодировании адреса')
    return null
  }
}

const FullScreenMap = () => {
  const brigadeId = sessionStorage.getItem('brigadeId')
  const { data: tasks } = useGetTasksByBrigadeId({ brigadeId: brigadeId ?? '' })
  const [markers, setMarkers] = useState<TaskMarker[]>([])
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null)
  const [isCentered, setIsCentered] = useState(false)
  const mapRef = useRef<LeafletMap | null>(null)

  const handleCenterOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView(userLocation, 16)
      setIsCentered(true)
      setTimeout(() => setIsCentered(false), 1500)
    } else {
      toast.error('Не удалось определить ваше местоположение')
    }
  }

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        })
        const coords: LatLngTuple = [position.coords.latitude, position.coords.longitude]
        setUserLocation(coords)
      } catch (error) {
        console.warn('Ошибка при получении геолокации:', error)
      }
    }

    fetchGeolocation()
  }, [])

  useEffect(() => {
    if (!brigadeId || !tasks) return

    const fetchCoordinates = async () => {
      try {
        const plannedTasks = tasks.filter((task) => task.status === 0)

        const parsedAddresses = plannedTasks.map((task) => {
          const parts = task.address.split(',')
          if (parts.length >= 3) {
            const [rawCity, rawStreet, rawHouse] = parts.map((p) => p.trim())
            const city = rawCity.replace(/^г\.\s*/i, '')
            const street = rawStreet.replace(/^ул\.\s*/i, '')
            const house = rawHouse.replace(/^д\.\s*/i, '')
            return `${street} ${house}, Пенза, Пензенская область, Россия`
          }
          return `${task.address}, Пенза, Пензенская область, Россия`
        })

        const coords = await Promise.all(
          parsedAddresses.map((addr, index) =>
            geocodeAddress(addr).then((coord) =>
              coord ? { id: plannedTasks[index].id, position: coord } : null
            )
          )
        )

        const validMarkers = coords.filter((item): item is TaskMarker => item !== null)
        setMarkers(validMarkers)

        if (validMarkers.length > 0 && mapRef.current) {
          const bounds = new LatLngBounds(validMarkers.map((m) => m.position))
          if (userLocation) bounds.extend(userLocation)
          mapRef.current.fitBounds(bounds, { padding: [50, 50] })
        }
      } catch (error) {
        toast.error('Ошибка при обработке координат')
        console.error(error)
      }
    }

    fetchCoordinates()
  }, [tasks, brigadeId, userLocation])

  if (!brigadeId) {
    return <div className="p-4 text-red-500">Ошибка: не указана бригада</div>
  }

  return (
    <div className="h-[calc(100vh-150px)] w-full overflow-hidden">
      <div className="relative w-full h-full">
        <InteractiveMap
          markers={markers}
          userLocation={userLocation}
          mapRef={mapRef}
          enableRouting
          className="w-full h-full"
        />

        <div className="absolute bottom-4 right-4 z-[1001]">
          <LocateControl onClick={handleCenterOnUser} isLocating={isCentered} />
        </div>
      </div>
    </div>
  )
}

export default FullScreenMap
