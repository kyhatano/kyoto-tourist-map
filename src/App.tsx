import { useState } from 'react';
import { locations } from './data/locations';
import type { TouristLocation } from './data/locations';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import L from 'leaflet';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<TouristLocation | null>(null);
  const [showPrimary, setShowPrimary] = useState(true);
  const [showSecondary, setShowSecondary] = useState(false);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);

  // 初回ロード時などに全ピンを収めるBoundsを計算
  const calculateBounds = () => {
    const activeLocs = locations.filter(loc => {
      if (loc.type === 'primary' && !showPrimary) return false;
      if (loc.type === 'secondary' && !showSecondary) return false;
      return true;
    });

    if (activeLocs.length === 0) return null;

    const bounds = L.latLngBounds(
      [activeLocs[0].lat, activeLocs[0].lng],
      [activeLocs[0].lat, activeLocs[0].lng]
    );
    activeLocs.forEach(loc => bounds.extend([loc.lat, loc.lng]));
    return bounds;
  };

  const handleSelectLocation = (loc: TouristLocation) => {
    setSelectedLocation(loc);
  };

  const resetView = () => {
    setSelectedLocation(null);
    setMapBounds(calculateBounds());
  };

  return (
    <div className="flex w-full h-screen font-serif bg-[#fdfbf7]">
      <Sidebar
        locations={locations}
        onSelectLocation={handleSelectLocation}
        showPrimary={showPrimary}
        setShowPrimary={(val) => {
          setShowPrimary(val);
          // チェックが変更されたらズームを調整
          setTimeout(() => setMapBounds(calculateBounds()), 100);
        }}
        showSecondary={showSecondary}
        setShowSecondary={(val) => {
          setShowSecondary(val);
          setTimeout(() => setMapBounds(calculateBounds()), 100);
        }}
      />
      <div className="flex-grow h-screen relative">
        <Map
          locations={locations.filter(loc =>
            (loc.type === 'primary' && showPrimary) ||
            (loc.type === 'secondary' && showSecondary)
          )}
          selectedLocation={selectedLocation}
          mapBounds={mapBounds || calculateBounds()}
        />
        <button
          onClick={resetView}
          className="absolute bottom-8 right-8 z-[1000] bg-[#8b3a3a] text-white px-6 py-3 rounded-full font-bold font-serif shadow-[0_4px_15px_rgba(139,58,58,0.4)] hover:bg-[#7a3232] hover:scale-105 transition-all duration-200"
        >
          地図全体を見渡す
        </button>
      </div>
    </div>
  );
}

export default App;
