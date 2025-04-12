import L, { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

// Убираем логотип Leaflet
L.Control.Attribution.prototype.options.prefix = ''

// Иконка обычных точек
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
})

// Иконка местоположения пользователя
const UserLocationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

const RouteDisplay = ({ points }: { points: LatLngTuple[] }) => {
  const [route, setRoute] = useState<LatLngTuple[]>([])
  const map = useMap()

  useEffect(() => {
    if (points.length < 2) {
      setRoute([])
      return
    }

    const fetchRoute = async () => {
      try {
        const coordsString = points.map(p => `${p[1]},${p[0]}`).join(';')
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`
        )
        const data = await response.json()
        const coords = data.routes[0].geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]]
        )
        setRoute(coords)
        map.fitBounds(L.latLngBounds(coords))
      } catch (error) {
        console.error('Routing error:', error)
      }
    }

    fetchRoute()
  }, [points])

  return route.length > 0 ? (
    <Polyline
      positions={route}
      pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.7 }}
    />
  ) : null
}

const InteractiveMap = ({
  className = 'h-[500px] w-full',
  enableRouting = true,
  userLocation = null,
}: {
  className?: string
  enableRouting?: boolean
  userLocation?: LatLngTuple | null
}) => {
  const [staticMarkers] = useState<LatLngTuple[]>([
    [53.195, 45.004],
    [53.202, 45.018],
    [53.188, 45.025],
    [53.175, 45.010],
  ])

  const [center] = useState<LatLngTuple>([53.195, 45.004])
  const mapRef = useRef<L.Map>(null)

  const allMarkers = userLocation
    ? [...staticMarkers, userLocation]
    : staticMarkers

  return (
    <MapContainer
      center={center}
      zoom={13}
      minZoom={2}
      maxZoom={18}
      scrollWheelZoom
      className={className}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />

      {staticMarkers.map((position, index) => (
        <Marker
          key={`marker-${index}`}
          position={position}
          icon={DefaultIcon}
        >
          <Tooltip permanent>
            <div className="flex flex-col">
              <span className="font-medium">Точка {index + 1}</span>
              <span className="text-xs text-gray-500">
                {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </span>
            </div>
          </Tooltip>
        </Marker>
      ))}

      {userLocation && (
        <Marker
          position={userLocation}
          icon={UserLocationIcon}
        >
          <Tooltip permanent>
            <div className="flex flex-col">
              <span className="font-medium">Вы здесь</span>
              <span className="text-xs text-gray-500">
                {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
              </span>
            </div>
          </Tooltip>
        </Marker>
      )}

      {enableRouting && <RouteDisplay points={allMarkers} />}
    </MapContainer>
  )
}

export default InteractiveMap
