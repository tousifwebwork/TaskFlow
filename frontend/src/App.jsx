import { useState } from 'react';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import ErrorBanner from './components/ErrorBanner';
import useTasks from './hooks/useTasks';

function App() {
  const { tasks, loading, error, addTask, deleteTask, toggleTask, editTask } = useTasks();
  const [filter, setFilter] = useState("all");

  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  const filteredTasks = filter === "completed" 
    ? tasks.filter(t => t.completed)
    : filter === "pending"
    ? tasks.filter(t => !t.completed)
    : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-brand-950 text-zinc-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <ErrorBanner message={error} />}
        
        <Header counts={counts} />
        
        <div className="mt-8 space-y-6">
          <AddTaskForm onAdd={addTask} />
          <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
          <TaskList 
            tasks={filteredTasks} 
            loading={loading}
            filter={filter}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
