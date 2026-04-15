export default function TourCard({ affiliate }) {
  return (
    <a
      href={affiliate.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => { if (affiliate.url === '#') e.preventDefault(); e.stopPropagation(); }}
      className="block rounded-md border border-accent/20 bg-accent-dim p-3 transition-colors hover:border-accent/40 group"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-accent text-xs">&#9758;</span>
        <span className="text-xs font-semibold text-text tracking-tight group-hover:text-accent transition-colors">
          {affiliate.name}
        </span>
      </div>
      <p className="text-[10px] font-mono text-text-muted tracking-wide leading-relaxed">
        {affiliate.note}
      </p>
    </a>
  );
}
