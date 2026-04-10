import TaskCard from "./TaskCard";

export default function TaskList({ tasks, loading, onToggle, onDelete, onEdit, filter }) {
  if (loading) return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="task-card animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-zinc-800" />
            <div className="h-4 bg-zinc-800 rounded-lg" style={{ width: `${60 + i * 12}%` }} />
          </div>
        </div>
      ))}
    </div>
  );

  if (tasks.length === 0) return (
    <div className="task-card py-12 text-center">
      <div className="text-4xl mb-3">
        {filter === "completed" ? "🎯" : filter === "pending" ? "✨" : "📝"}
      </div>
      <p className="text-zinc-400 font-medium">
        {filter === "completed" ? "No completed tasks yet"
          : filter === "pending" ? "All caught up!"
          : "No tasks yet. Add one above!"}
      </p>
    </div>
  );

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task._id} className="animate-slide-in">
          <TaskCard task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}
