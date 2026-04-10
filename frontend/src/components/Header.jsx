export default function Header({ counts }) {
  const pct = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
             <p className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-1">Task Manager</p>
             <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">TaskFlow</h1>
        </div>
        <div className="text-right">
             <p className="text-4xl font-bold text-blue-400 font-mono">
            {pct}<span className="text-lg text-zinc-500">%</span>
          </p>
          <p className="text-xs text-zinc-500">complete</p>
        </div>
      </div>
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div
             className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
