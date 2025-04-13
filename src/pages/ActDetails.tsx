import { useParams, useNavigate } from 'react-router'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { useEffect, useRef, useState } from 'react'
import { Spinner } from '../components/ui/spinner'
import InteractiveMap from '../components/core/map'
import LocateControl from '../components/core/LocateControl'
import { getFullName } from '../utils/strings'
import useGetTaskById from '../api/hooks/useGetTaskById'
import { useDispatch } from 'react-redux'
import { updateFormState } from '../store/navigationSlice'
import useUpdateTaskStatus from '../api/hooks/useUpdateTaskStatus'
import { LatLngTuple, Map as LeafletMap } from 'leaflet'
import { Geolocation } from '@capacitor/geolocation'
import { toast } from 'react-hot-toast'

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
  } catch {
    return null
  }
}

export const ActDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null)
  const [marker, setMarker] = useState<{ id: string; position: LatLngTuple } | null>(null)
  const [isActive, setIsActive] = useState(false)
  const mapRef = useRef<LeafletMap | null>(null)

  const { data: task, error, isLoading } = useGetTaskById({ id })

  const handleCreateAct = async () => {
    if (task) {
      try {
        const { execute } = useUpdateTaskStatus({ id: task.id, status: 1 })
        await execute()

        dispatch(updateFormState({
          accountNumber: task.account_number,
          phoneNumber: task.consumer.phone_number,
          consumer: getFullName(task.consumer),
          address: task.address,
        }))

        navigate('/create')
      } catch (e) {
        console.error('Ошибка при обновлении статуса задачи:', e)
        toast.error('Не удалось обновить статус задачи')
      }
    }
  }

  const handleCenterOnUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView(userLocation, 16)
      setIsActive(true)
      setTimeout(() => setIsActive(false), 1500)
    } else {
      toast.error('Не удалось определить ваше местоположение')
    }
  }

  // Получаем геолокацию один раз при загрузке
  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
        })
        const coords: LatLngTuple = [position.coords.latitude, position.coords.longitude]
        setUserLocation(coords)
      } catch {
        // Ничего не делаем
      }
    }

    fetchGeolocation()
  }, [])

  useEffect(() => {
    const fetchMarker = async () => {
      if (!task) return
      const parts = task.address.split(',')
      if (parts.length >= 3) {
        const [rawCity, rawStreet, rawHouse] = parts.map((p) => p.trim())
        const city = rawCity.replace(/^г\.\s*/i, '')
        const street = rawStreet.replace(/^ул\.\s*/i, '')
        const house = rawHouse.replace(/^д\.\s*/i, '')
        const formattedAddress = `${street} ${house}, ${city}, Пензенская область, Россия`
        const coord = await geocodeAddress(formattedAddress)
        if (coord) {
          setMarker({ id: task.id, position: coord })
        }
      }
    }

    fetchMarker()
  }, [task])

  if (isLoading) return <Spinner />
  if (error) return <div className="p-4 text-center text-red-500">Ошибка при загрузке задачи</div>
  if (!task) return <div className="p-4 text-center">Задача не найдена</div>

  return (
    <div className="flex h-full flex-col">
      <div className="relative h-[50vh] w-full">
        <InteractiveMap
          enableRouting={true}
          userLocation={userLocation}
          markers={marker ? [marker] : []}
          className="h-full w-full rounded-md"
          mapRef={mapRef}
        />

        <div className="absolute right-4 bottom-4 z-[1001]">
          <LocateControl
            onClick={handleCenterOnUser}
            isLocating={isActive}
          />
        </div>
      </div>

      <div className="border-t border-gray-200 px-5 pb-5">
        <div className="m-5 flex flex-col gap-3">
          <p className="text-14-20-regular select-none">{task.address}</p>
          <Label text={getFullName(task.consumer)} icon="user" />
          <Label
            text={task.consumer.phone_number}
            className="underline-black-1 underline underline-offset-2"
            icon="phone"
          />
          <Label text={`${task.account_number}`} icon="idCard" />
          <Label text={task.comment} icon="fileBlank" />
        </div>
        <Button className="w-full" onClick={handleCreateAct}>
          Составить акт
        </Button>
      </div>
    </div>
  )
}
