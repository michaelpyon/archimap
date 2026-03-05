import { useState, useMemo } from 'react';
import walks from './data/walks';
import WalkMap from './components/WalkMap';
import BuildingCard from './components/BuildingCard';

const ERAS = [
  { label: 'All Eras', min: 0, max: 9999 },
  { label: 'Pre-Civil War (before 1861)', min: 0, max: 1860 },
  { label: 'Gilded Age (1861-1900)', min: 1861, max: 1900 },
  { label: 'Early 20th Century (1901-1929)', min: 1901, max: 1929 },
  { label: 'Mid-Century (1930-1969)', min: 1930, max: 1969 },
  { label: 'Modern (1970+)', min: 1970, max: 9999 },
];

// Flatten all buildings with neighborhood info
const ALL_BUILDINGS = walks.flatMap(w =>
  w.buildings.map(b => ({ ...b, neighborhood: w.neighborhood, borough: w.borough, walkId: w.id }))
);

const ALL_STYLES = [...new Set(ALL_BUILDINGS.map(b => b.style))].sort();
const ALL_NEIGHBORHOODS = walks.map(w => w.neighborhood);

export default function App() {
  const [activeBuilding, setActiveBuilding] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedEra, setSelectedEra] = useState(ERAS[0]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  // Filter buildings across all neighborhoods
  const filteredBuildings = useMemo(() => {
    return ALL_BUILDINGS.filter(b => {
      const styleMatch = !selectedStyle || b.style.includes(selectedStyle);
      const eraMatch = b.year >= selectedEra.min && b.year <= selectedEra.max;
      const hoodMatch = !selectedNeighborhood || b.neighborhood === selectedNeighborhood;
      return styleMatch && eraMatch && hoodMatch;
    });
  }, [selectedStyle, selectedEra, selectedNeighborhood]);

  // Build a virtual walk object for the map from filtered results
  const mapWalk = useMemo(() => {
    if (filteredBuildings.length === 0) return null;
    // Compute center from filtered buildings
    const avgLat = filteredBuildings.reduce((s, b) => s + b.lat, 0) / filteredBuildings.length;
    const avgLng = filteredBuildings.reduce((s, b) => s + b.lng, 0) / filteredBuildings.length;
    // Zoom out more when showing multiple neighborhoods
    const neighborhoods = new Set(filteredBuildings.map(b => b.neighborhood));
    const zoom = neighborhoods.size > 1 ? 12 : 15;
    return {
      id: 'filtered',
      neighborhood: neighborhoods.size === 1 ? [...neighborhoods][0] : 'NYC',
      center: [avgLat, avgLng],
      zoom,
      buildings: filteredBuildings,
    };
  }, [filteredBuildings]);

  function clearFilters() {
    setSelectedStyle('');
    setSelectedEra(ERAS[0]);
    setSelectedNeighborhood('');
    setActiveBuilding(0);
  }

  const hasFilters = selectedStyle || selectedEra !== ERAS[0] || selectedNeighborhood;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 max-w-5xl mx-auto sm:pt-16 sm:pb-8">
        <h1
          className="font-display text-4xl sm:text-6xl text-text tracking-tight leading-[0.95] mb-3 animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          ArchiMap
        </h1>
        <p
          className="text-text-muted text-sm leading-relaxed max-w-md animate-fade-up"
          style={{ animationDelay: '250ms' }}
        >
          Explore NYC architecture by style, era, or neighborhood.
        </p>
      </header>

      {/* Filters */}
      <section className="px-6 max-w-5xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
        <div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-thin">
          <select
            value={selectedStyle}
            onChange={(e) => { setSelectedStyle(e.target.value); setActiveBuilding(0); }}
            className="bg-surface border border-border rounded-md px-2 py-1.5 text-[11px] text-text-muted focus:outline-none focus:border-text-subtle shrink-0"
          >
            <option value="">Style</option>
            {ALL_STYLES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={ERAS.indexOf(selectedEra)}
            onChange={(e) => { setSelectedEra(ERAS[Number(e.target.value)]); setActiveBuilding(0); }}
            className="bg-surface border border-border rounded-md px-2 py-1.5 text-[11px] text-text-muted focus:outline-none focus:border-text-subtle shrink-0"
          >
            <option value="" disabled>Era</option>
            {ERAS.map((era, i) => (
              <option key={era.label} value={i}>{era.label}</option>
            ))}
          </select>

          <select
            value={selectedNeighborhood}
            onChange={(e) => { setSelectedNeighborhood(e.target.value); setActiveBuilding(0); }}
            className="bg-surface border border-border rounded-md px-2 py-1.5 text-[11px] text-text-muted focus:outline-none focus:border-text-subtle shrink-0"
          >
            <option value="">Area</option>
            {ALL_NEIGHBORHOODS.map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-[10px] font-mono text-text-subtle hover:text-text tracking-wide shrink-0"
            >
              Clear
            </button>
          )}

          <span className="text-[10px] font-mono text-text-subtle ml-auto shrink-0">
            {filteredBuildings.length}/{ALL_BUILDINGS.length}
          </span>
        </div>
      </section>

      {/* Map + Building List */}
      <main className="px-6 max-w-5xl mx-auto pb-16">
        {filteredBuildings.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <WalkMap
              walk={mapWalk}
              activeBuilding={activeBuilding}
              onBuildingClick={setActiveBuilding}
            />

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredBuildings.map((building, i) => (
                <BuildingCard
                  key={`${building.walkId}-${building.name}`}
                  building={building}
                  index={i}
                  isActive={activeBuilding === i}
                  onClick={() => setActiveBuilding(i)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-subtle text-xs font-mono tracking-wide">
              No buildings match these filters
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 text-xs text-text-muted hover:text-text font-mono"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8 max-w-5xl mx-auto border-t border-border pt-6 mt-12">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-text-subtle font-mono">
            Data: NYC LPC, AIA Guide, Wikipedia
          </span>
          <span className="text-[11px] text-text-subtle font-mono">
            ArchiMap
          </span>
        </div>
      </footer>
    </div>
  );
}
