import { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import artDecoTour from '../data/artDecoTour';
import RestaurantCard from './RestaurantCard';
import TourCard from './TourCard';

// Leaflet L.divIcon uses inline HTML strings, so CSS variables cannot be injected.
// Hardcoded values here match @theme tokens in index.css:
//   #B8860B  = --color-accent
//   #FAF7F0  = --color-bg
//   #2D2D2D  = --color-text
//   #996F09  = --color-accent-hover
//   #D4CFC5  = --color-border
//   rgba(184, 134, 11, 0.4) = --color-accent at 40% opacity
//   rgba(45, 45, 45, 0.15)  = --color-text at 15% opacity
function createTourIcon(number, isActive) {
  const size = isActive ? 36 : 28;
  return L.divIcon({
    className: 'archimap-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${isActive ? '#B8860B' : '#FAF7F0'};
      color: ${isActive ? '#FAF7F0' : '#2D2D2D'};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isActive ? '14px' : '12px'};
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      border: ${isActive ? '3px' : '2px'} solid ${isActive ? '#996F09' : '#D4CFC5'};
      box-shadow: ${isActive ? '0 0 16px rgba(184, 134, 11, 0.4)' : '0 2px 8px rgba(45,45,45,0.15)'};
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    ">${number}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function TourMapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.0 });
  }, [map, center, zoom]);
  return null;
}

export default function TourView({ onExit }) {
  const [currentStop, setCurrentStop] = useState(0);
  const cardRef = useRef(null);
  const stops = artDecoTour.stops;
  const stop = stops[currentStop];

  const center = useMemo(() => [stop.lat, stop.lng], [stop]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStop]);

  // Keyboard arrow navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowRight' && currentStop < stops.length - 1) {
        setCurrentStop(currentStop + 1);
      } else if (e.key === 'ArrowLeft' && currentStop > 0) {
        setCurrentStop(currentStop - 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStop, stops.length]);

  function goNext() {
    if (currentStop < stops.length - 1) setCurrentStop(currentStop + 1);
  }

  function goPrev() {
    if (currentStop > 0) setCurrentStop(currentStop - 1);
  }

  const restaurants = stop.affiliates.filter(a => a.type === 'restaurant');
  const tours = stop.affiliates.filter(a => a.type === 'tour');
  const hasAffiliates = restaurants.length > 0 || tours.length > 0;

  return (
    <div className="min-h-screen bg-bg">
      {/* Tour Header */}
      <header className="px-6 pt-8 pb-4 max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-text tracking-tight leading-tight">
            {artDecoTour.name}
          </h1>
          <p className="text-[11px] font-mono text-text-subtle tracking-wide mt-1">
            {artDecoTour.distance} &middot; {artDecoTour.duration} &middot; {stops.length} stops
          </p>
        </div>
        <button
          onClick={onExit}
          className="text-xs font-mono text-text-subtle hover:text-text tracking-wide border border-border rounded-md px-4 py-2.5 min-h-[44px] hover:border-border-hover transition-colors"
        >
          Exit Tour
        </button>
      </header>

      {/* Progress Bar */}
      <div className="px-6 max-w-5xl mx-auto mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-accent tabular-nums">
            {currentStop + 1} of {stops.length}
          </span>
          <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${((currentStop + 1) / stops.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Map + Stop Card */}
      <main className="px-6 max-w-5xl mx-auto pb-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Map */}
          <div className="rounded-lg overflow-hidden border border-border h-[400px] sm:h-[500px]">
            <MapContainer
              center={center}
              zoom={16}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              attributionControl={true}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              <TourMapUpdater center={center} zoom={16} />

              {/* Full route polyline */}
              <Polyline
                positions={artDecoTour.routeWaypoints}
                pathOptions={{
                  color: '#B8860B', // --color-accent
                  weight: 3,
                  dashArray: '8, 10',
                  opacity: 0.6,
                }}
              />

              {/* Stop markers */}
              {stops.map((s, i) => (
                <Marker
                  key={s.id}
                  position={[s.lat, s.lng]}
                  icon={createTourIcon(s.id, currentStop === i)}
                  eventHandlers={{
                    click: () => setCurrentStop(i),
                  }}
                />
              ))}
            </MapContainer>
          </div>

          {/* Stop Card */}
          <div
            ref={cardRef}
            className="bg-surface border border-border rounded-lg overflow-y-auto max-h-[500px] scrollbar-thin"
          >
            {/* Placeholder image area */}
            <div className="h-40 bg-surface-hover flex items-center justify-center border-b border-border">
              <div className="text-center">
                <span className="text-4xl font-display text-accent">{stop.id}</span>
                <p className="text-[10px] font-mono text-text-subtle mt-1 tracking-wide">{stop.style}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="font-display text-xl text-text tracking-tight leading-tight mb-1">
                  {stop.name}
                </h2>
                <p className="text-[10px] font-mono text-text-subtle tracking-wide">
                  {stop.address}
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-[10px] font-mono text-text-muted tracking-wide">
                  {stop.architect}
                </span>
                <span className="text-[10px] text-text-subtle">&middot;</span>
                <span className="text-[10px] font-mono text-text-muted tracking-wide">
                  {stop.year}
                </span>
              </div>

              <p className="text-xs text-text-muted leading-relaxed">
                {stop.story}
              </p>

              {/* Highlights */}
              <div>
                <h3 className="text-[10px] font-mono text-text-subtle tracking-widest uppercase mb-2">
                  Highlights
                </h3>
                <ul className="space-y-1.5">
                  {stop.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent text-[10px] mt-0.5 shrink-0">&#9670;</span>
                      <span className="text-[11px] text-text-muted leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Walking directions */}
              {stop.walkingTo && (
                <div className="bg-accent-dim rounded-md p-3">
                  <h3 className="text-[10px] font-mono text-accent tracking-widest uppercase mb-1.5">
                    Walking to next stop
                  </h3>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {stop.walkingTo}
                  </p>
                </div>
              )}

              {/* Affiliates */}
              {hasAffiliates && (
                <div>
                  <h3 className="text-[10px] font-mono text-text-subtle tracking-widest uppercase mb-2">
                    Nearby
                  </h3>
                  <div className="space-y-2">
                    {restaurants.map((a, i) => (
                      <RestaurantCard key={`r-${i}`} affiliate={a} />
                    ))}
                    {tours.map((a, i) => (
                      <TourCard key={`t-${i}`} affiliate={a} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="sticky bottom-0 bg-surface border-t border-border p-4 flex items-center justify-between">
              <button
                onClick={goPrev}
                disabled={currentStop === 0}
                className="text-xs font-mono tracking-wide px-4 py-2.5 min-h-[44px] rounded-md border border-border
                  enabled:hover:border-border-hover enabled:hover:text-text
                  disabled:opacity-30 disabled:cursor-not-allowed
                  text-text-muted transition-colors"
              >
                &larr; Previous
              </button>
              <span className="text-[10px] font-mono text-text-subtle tabular-nums">
                {currentStop + 1}/{stops.length}
              </span>
              <button
                onClick={goNext}
                disabled={currentStop === stops.length - 1}
                className="text-xs font-mono tracking-wide px-4 py-2.5 min-h-[44px] rounded-md border border-accent bg-accent text-bg
                  enabled:hover:bg-accent-hover
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-colors"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
