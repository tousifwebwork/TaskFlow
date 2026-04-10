import { useState } from "react";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return setError("Title is required");
    if (trimmed.length < 3) return setError("Must be at least 3 characters");
    setError("");
    setLoading(true);
    const ok = await onAdd(trimmed);
    if (ok) setTitle("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          className={`w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex-1 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
          placeholder="Add a new task…"
          value={title}
          onChange={(e) => { setTitle(e.target.value); if (error) setError(""); }}
          disabled={loading}
          maxLength={200}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none whitespace-nowrap"
          disabled={loading || !title.trim()}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Adding
            </span>
          ) : "Add Task"}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm pl-1">{error}</p>}
    </form>
  );
}
