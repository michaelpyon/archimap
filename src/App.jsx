import { useState, useMemo } from 'react';
import walks from './data/walks';
import NeighborhoodSelector from './components/NeighborhoodSelector';
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

// Extract all unique styles from the data
const ALL_STYLES = [...new Set(
  walks.flatMap(w => w.buildings.map(b => b.style))
)].sort();

export default function App() {
  const [selectedWalk, setSelectedWalk] = useState(null);
  const [activeBuilding, setActiveBuilding] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedEra, setSelectedEra] = useState(ERAS[0]);

  function handleSelectWalk(walk) {
    setSelectedWalk(walk);
    setActiveBuilding(0);
  }

  // Filter buildings within the selected walk
  const filteredBuildings = useMemo(() => {
    if (!selectedWalk) return [];
    return selectedWalk.buildings.filter(b => {
      const styleMatch = !selectedStyle || b.style.includes(selectedStyle);
      const eraMatch = b.year >= selectedEra.min && b.year <= selectedEra.max;
      return styleMatch && eraMatch;
    });
  }, [selectedWalk, selectedStyle, selectedEra]);

  // Create a filtered walk object for the map
  const filteredWalk = useMemo(() => {
    if (!selectedWalk) return null;
    return { ...selectedWalk, buildings: filteredBuildings };
  }, [selectedWalk, filteredBuildings]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 max-w-5xl mx-auto sm:pt-16 sm:pb-10">
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
          Pick a neighborhood. Walk the route. See the architecture.
        </p>
      </header>

      {/* Neighborhood Selector */}
      <section
        className="px-6 max-w-5xl mx-auto mb-6 animate-fade-up"
        style={{ animationDelay: '400ms' }}
      >
        <p className="text-text-subtle text-xs font-mono tracking-widest uppercase mb-4">
          Neighborhoods
        </p>
        <NeighborhoodSelector
          walks={walks}
          selected={selectedWalk}
          onSelect={handleSelectWalk}
        />
      </section>

      {/* Walk Content */}
      {selectedWalk && (
        <main className="px-6 max-w-5xl mx-auto pb-16 animate-fade-in">
          {/* Walk header */}
          <div className="mb-4 mt-4">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-lg font-semibold text-text tracking-tight">
                {selectedWalk.neighborhood}
              </h2>
              <span className="text-[10px] font-mono text-text-subtle tracking-wide">
                {selectedWalk.borough}
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              {selectedWalk.description}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={selectedStyle}
              onChange={(e) => { setSelectedStyle(e.target.value); setActiveBuilding(0); }}
              className="bg-surface border border-border rounded-md px-3 py-1.5 text-xs text-text-muted focus:outline-none focus:border-text-subtle"
            >
              <option value="">All Styles</option>
              {ALL_STYLES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={ERAS.indexOf(selectedEra)}
              onChange={(e) => { setSelectedEra(ERAS[Number(e.target.value)]); setActiveBuilding(0); }}
              className="bg-surface border border-border rounded-md px-3 py-1.5 text-xs text-text-muted focus:outline-none focus:border-text-subtle"
            >
              {ERAS.map((era, i) => (
                <option key={era.label} value={i}>{era.label}</option>
              ))}
            </select>

            {(selectedStyle || selectedEra !== ERAS[0]) && (
              <button
                onClick={() => { setSelectedStyle(''); setSelectedEra(ERAS[0]); setActiveBuilding(0); }}
                className="text-[10px] font-mono text-text-subtle hover:text-text tracking-wide"
              >
                Clear filters
              </button>
            )}

            <span className="text-[10px] font-mono text-text-subtle self-center ml-auto">
              {filteredBuildings.length} of {selectedWalk.buildings.length} stops
            </span>
          </div>

          {/* Map + Building List */}
          {filteredBuildings.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
              <WalkMap
                walk={filteredWalk}
                activeBuilding={activeBuilding}
                onBuildingClick={setActiveBuilding}
              />

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredBuildings.map((building, i) => (
                  <BuildingCard
                    key={`${selectedWalk.id}-${building.name}`}
                    building={building}
                    index={i}
                    isActive={activeBuilding === i}
                    onClick={() => setActiveBuilding(i)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-text-subtle text-xs font-mono">
                No buildings match these filters in {selectedWalk.neighborhood}
              </p>
            </div>
          )}
        </main>
      )}

      {/* Empty State */}
      {!selectedWalk && (
        <div className="px-6 max-w-5xl mx-auto py-20 text-center animate-fade-in">
          <p className="text-text-subtle text-xs font-mono tracking-wide">
            Select a neighborhood to begin
          </p>
        </div>
      )}

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
