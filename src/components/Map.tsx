import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { TouristLocation } from '../data/locations';
import 'leaflet/dist/leaflet.css';

// カスタムアイコン（えんじ色：Primary）
const primaryIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 11.2 16 24 16 24s16-12.8 16-24C32 7.16 24.84 0 16 0zm0 22c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#8b3a3a"/>
      <circle cx="16" cy="16" r="4" fill="#ffffff"/>
    </svg>
  `),
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
});

// カスタムアイコン（抹茶色：Secondary/おすすめ）
const secondaryIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 11.2 16 24 16 24s16-12.8 16-24C32 7.16 24.84 0 16 0zm0 22c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#4B6043"/>
      <circle cx="16" cy="16" r="4" fill="#ffffff"/>
    </svg>
  `),
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
});

// マップの表示領域を制御するコンポーネント
const ChangeView = ({ center, zoom, bounds }: { center?: [number, number], zoom?: number, bounds?: L.LatLngBounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds && bounds.isValid()) {
            map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
        } else if (center && zoom) {
            map.flyTo(center, zoom, { duration: 1.2 });
        }
    }, [center, zoom, bounds, map]);
    return null;
};

interface MapProps {
    locations: TouristLocation[];
    selectedLocation: TouristLocation | null;
    mapBounds: L.LatLngBounds | null;
}

export default function Map({ locations, selectedLocation, mapBounds }: MapProps) {
    const markerRefs = useRef<Record<string, L.Marker>>({});

    // 特定の場所が選択されたらポップアップを開く
    useEffect(() => {
        if (selectedLocation && markerRefs.current[selectedLocation.id]) {
            // ズームのアニメーションを待ってから開く
            setTimeout(() => {
                markerRefs.current[selectedLocation.id]?.openPopup();
            }, 500);
        }
    }, [selectedLocation]);

    return (
        <div className="flex-grow h-screen relative z-0">
            <MapContainer
                center={[35.0116, 135.7680]}
                zoom={10}
                zoomControl={false}
                className="w-full h-full bg-[#e5e3df]"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    className="contrast-90 saturate-80 sepia-[0.1]" // Tailwind CSS filtering
                />

                <ChangeView
                    center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : undefined}
                    zoom={selectedLocation ? (selectedLocation.area === '海の京都' ? 13 : 16) : undefined}
                    bounds={mapBounds || undefined}
                />

                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        position={[loc.lat, loc.lng]}
                        icon={loc.type === 'primary' ? primaryIcon : secondaryIcon}
                        ref={(ref) => {
                            if (ref) markerRefs.current[loc.id] = ref;
                        }}
                    >
                        <Popup className="kyoto-popup rounded-xl shadow-lg border-0 overflow-hidden min-w-[240px]">
                            <div className="p-1">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-dashed border-gray-300">
                                    <span className={`w-3 h-3 rounded-full ${loc.type === 'primary' ? 'bg-[#8b3a3a]' : 'bg-[#4B6043]'}`}></span>
                                    <h3 className="font-bold text-[#8b3a3a] text-lg m-0 drop-shadow-sm font-['Noto_Serif_JP']">
                                        {loc.name}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-700 m-0 mb-3 leading-relaxed font-['Helvetica_Neue']">
                                    {loc.desc}
                                </p>
                                <div className="pt-2 text-right">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors font-medium no-underline whitespace-nowrap"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        Googleマップで経路を見る
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <style>{`
        .leaflet-control-zoom {
          display: none;
        }
        .kyoto-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
        }
        .kyoto-popup .leaflet-popup-content {
          margin: 14px 16px;
        }
        /* Mute leaflet tiles to look more like a map pamphlet */
        .leaflet-tile-pane {
          filter: contrast(0.95) saturate(0.85) sepia(0.08);
        }
      `}</style>
        </div>
    );
}
