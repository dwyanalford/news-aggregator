function HoverTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative inline-block group">
      <div className="p-2 rounded-full hover:bg-muted transition-colors">
        {children}
      </div>
      <span className="tooltip absolute top-full left-1/2 transform -translate-x-1/2
        bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-md
        opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
        {label}
      </span>
    </div>
  );
}

export default HoverTooltip;