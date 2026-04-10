const FILTERS = [
  { key: "all",       label: "All" },
  { key: "pending",   label: "Pending" },
  { key: "completed", label: "Completed" },
];

export default function FilterBar({ filter, setFilter, counts }) {
  return (
    <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 transition-all duration-200 hover:text-zinc-200 hover:bg-zinc-800/50 ${filter === key ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : ""}`}
        >
          {label}
          <span className={`ml-1.5 text-xs font-mono ${filter === key ? "text-blue-400" : "text-zinc-600"}`}>
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
