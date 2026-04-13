export default function RestaurantCard({ affiliate }) {
  return (
    <a
      href={affiliate.url}
      onClick={(e) => e.stopPropagation()}
      className="block rounded-md border border-secondary/20 bg-secondary-dim p-3 transition-colors hover:border-secondary/40 group"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-secondary text-xs">&#9733;</span>
        <span className="text-xs font-semibold text-text tracking-tight group-hover:text-secondary transition-colors">
          {affiliate.name}
        </span>
      </div>
      <p className="text-[10px] font-mono text-text-muted tracking-wide leading-relaxed">
        {affiliate.note}
      </p>
    </a>
  );
}
