import L, { LatLngBounds, LatLngTuple } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router';
import 'leaflet/dist/leaflet.css';
import CustomZoomControl from '../../ui/zoom';

L.Control.Attribution.prototype.options.prefix = '';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

const UserLocationIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconRetinaUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const RouteDisplay = ({ points }: { points: LatLngTuple[] }) => {
  const [route, setRoute] = useState<LatLngTuple[]>([]);
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) {
      setRoute([]);
      return;
    }

    const fetchRoute = async () => {
      try {
        const coordsString = points.map((p) => `${p[1]},${p[0]}`).join(';');
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        const coords = data.routes[0].geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]]
        );
        setRoute(coords);
      } catch (error) {
        console.error('Routing error:', error);
      }
    };

    fetchRoute();
  }, [points]);

  return route.length > 0 ? (
    <Polyline
      positions={route}
      pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.7 }}
    />
  ) : null;
};

interface TaskMarker {
  id: string;
  position: LatLngTuple;
}

interface InteractiveMapProps {
  className?: string;
  enableRouting?: boolean;
  userLocation?: LatLngTuple | null;
  markers?: TaskMarker[];
  mapRef?: React.RefObject<L.Map>;
}

const InteractiveMap = ({
  className = 'h-full w-full',
  enableRouting = true,
  userLocation = null,
  markers = [],
  mapRef,
}: InteractiveMapProps) => {
  const [center] = useState<LatLngTuple>([53.195, 45.004]);
  const localMapRef = useRef<L.Map>(null); // внутренний ref
  const navigate = useNavigate();

  const allMarkerPositions = markers.map((m) => m.position);
  const allPoints = userLocation
    ? [...allMarkerPositions, userLocation]
    : allMarkerPositions;

  // Пробрасываем внутренний ref наружу
  useImperativeHandle(mapRef, () => localMapRef.current!, [localMapRef.current]);

  useEffect(() => {
    if (localMapRef.current && allPoints.length > 0) {
      const bounds = new LatLngBounds(allPoints);
      localMapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [JSON.stringify(allPoints)]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      minZoom={2}
      maxZoom={18}
      scrollWheelZoom
      className={className}
      ref={localMapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />

      {markers.map(({ id, position }, index) => (
        <Marker key={`marker-${index}`} position={position} icon={DefaultIcon}>
          <Popup>
            <div className="flex flex-col gap-1">
              <span className="font-medium">Задание {index + 1}</span>
              <button
                onClick={() => navigate(`/acts/${id}`)}
                className="text-blue-600 hover:underline text-sm"
              >
                Перейти к акту →
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker position={userLocation} icon={UserLocationIcon}>
          <Popup>
            <span>Вы здесь</span>
          </Popup>
        </Marker>
      )}

      {enableRouting && <RouteDisplay points={allPoints} />}
      <CustomZoomControl />
    </MapContainer>
  );
};

export default InteractiveMap;
