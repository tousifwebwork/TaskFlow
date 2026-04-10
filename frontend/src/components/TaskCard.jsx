import { useState } from "react";

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle]     = useState(task.title);
  const [saving, setSaving]   = useState(false);

  const handleEdit = async () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed.length < 3) return;
    if (trimmed === task.title) { setEditing(false); return; }
    setSaving(true);
    const ok = await onEdit(task._id, trimmed);
    if (ok) setEditing(false);
    setSaving(false);
  };

  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric",
  });

  return (
    <div className={`p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 group ${task.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task._id)}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
            ${task.completed ? "bg-blue-500 border-blue-500" : "border-zinc-600 hover:border-blue-500"}`}
          aria-label="Toggle complete"
        >
          {task.completed && (
            <svg className="w-3 h-3 text-zinc-950" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed py-1 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEdit();
                if (e.key === "Escape") { setEditing(false); setTitle(task.title); }
              }}
              autoFocus
              disabled={saving}
            />
          ) : (
            <p className={`text-sm font-medium truncate ${task.completed ? "line-through text-zinc-500" : "text-zinc-100"}`}>
              {task.title}
            </p>
          )}
          <p className="text-xs text-zinc-600 font-mono mt-0.5">{date}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {editing ? (
            <>
              <button onClick={handleEdit} disabled={saving} className="p-1.5 text-zinc-400 rounded-md transition-all duration-200 hover:bg-zinc-800/50 hover:text-zinc-200 text-xs text-blue-400 hover:text-blue-300">
                Save
              </button>
              <button onClick={() => { setEditing(false); setTitle(task.title); }} className="p-1.5 text-zinc-400 rounded-md transition-all duration-200 hover:bg-zinc-800/50 hover:text-zinc-200 text-xs">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setEditing(true)} className="p-1.5 text-zinc-400 rounded-md transition-all duration-200 hover:bg-zinc-800/50 hover:text-zinc-200" title="Edit">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </button>
              <button onClick={() => onDelete(task._id)} className="p-1.5 text-zinc-400 rounded-md transition-all duration-200 hover:bg-zinc-800/50 hover:text-zinc-200 hover:text-red-400" title="Delete">
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10M6 4V2h4v2M5 4v9h6V4H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
