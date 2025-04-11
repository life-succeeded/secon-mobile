import L, { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import { useRef, useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок маркеров
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

// Компонент адресного поиска
const AddressSearch = ({ 
  onAddPoint,
  onClearAll
}: { 
  onAddPoint: (coords: LatLngTuple) => void;
  onClearAll: () => void;
}) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const geocodeAddress = async (query: string): Promise<LatLngTuple | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data[0] ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
    } catch (err) {
      setError('Ошибка геокодирования');
      return null;
    }
  };

  const handleSearch = async () => {
    if (!address.trim()) return;
    const coords = await geocodeAddress(address);
    if (coords) onAddPoint(coords);
    setAddress('');
  };

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control leaflet-bar p-2 bg-white shadow-md">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Введите адрес"
          className="p-2 border rounded w-full mb-2"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="flex gap-2">
          <button 
            onClick={handleSearch}
            className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Добавить точку
          </button>
          <button 
            onClick={onClearAll}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Очистить
          </button>
        </div>
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
    </div>
  );
};

// Компонент маршрута
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
        const coordsString = points.map(p => `${p[1]},${p[0]}`).join(';');
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        const coords = data.routes[0].geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]]
        );
        setRoute(coords);
        map.fitBounds(L.latLngBounds(coords));
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

// Основной компонент карты
const InteractiveMap = ({
  className = "h-[500px] w-full",
  enableAddressSearch = true,
  enableRouting = true,
}: {
  className?: string;
  enableAddressSearch?: boolean;
  enableRouting?: boolean;
}) => {
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [center, setCenter] = useState<LatLngTuple>([53.195, 45.004]); // Пенза по умолчанию
  const mapRef = useRef<L.Map>(null);

  // Определение местоположения
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: LatLngTuple = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCenter(userLocation);
          mapRef.current?.flyTo(userLocation, 13);
        },
        () => console.log("Геолокация недоступна")
      );
    }
  }, []);

  const handleAddPoint = (coords: LatLngTuple) => {
    setMarkers([...markers, coords]);
  };

  const handleRemoveMarker = (index: number) => {
    setMarkers(markers.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setMarkers([]);
  };

  return (
    <div className="relative">
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
        />

        {markers.map((position, index) => (
          <Marker 
            key={`marker-${index}`}
            position={position}
            icon={DefaultIcon}
            eventHandlers={{
              click: () => handleRemoveMarker(index),
            }}
          >
            <Tooltip permanent>
              <div className="flex flex-col">
                <span className="font-medium">Точка {index + 1}</span>
                <span className="text-xs text-gray-500">
                  Кликните чтобы удалить
                </span>
              </div>
            </Tooltip>
          </Marker>
        ))}

        {enableRouting && <RouteDisplay points={markers} />}
      </MapContainer>

      {enableAddressSearch && (
        <AddressSearch 
          onAddPoint={handleAddPoint}
          onClearAll={handleClearAll}
        />
      )}
    </div>
  );
};

export default InteractiveMap;