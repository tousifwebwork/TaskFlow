import { useTasks } from "../hooks/useTasks";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import ErrorBanner from "../components/ErrorBanner";

export default function TaskPage() {
  const {
    tasks, loading, error, filter, setFilter,
    counts, addTask, toggleTask, editTask, deleteTask, refetch
  } = useTasks();

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Header counts={counts} />
        <AddTaskForm onAdd={addTask} />
        {error && <ErrorBanner message={error} onRetry={refetch} />}
        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          filter={filter}
        />
      </div>
    </div>
  );
}
