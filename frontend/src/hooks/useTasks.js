import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { taskApi } from "../api/taskApi";

const asTaskArray = (value) => (Array.isArray(value) ? value : []);

function useTasks() {
  const [tasks, setTasks]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [filter, setFilter]     = useState("all"); // "all" | "completed" | "pending"

  // --- Fetch ---
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await taskApi.getAll();
      setTasks(asTaskArray(data?.data));
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // --- Create ---
  const addTask = useCallback(async (title) => {
    const toastId = toast.loading("Adding task…");
    try {
      const { data } = await taskApi.create(title);
      setTasks((prev) => {
        const next = asTaskArray(prev);
        if (!data?.data) return next;
        return [data.data, ...next];
      });
      toast.success("Task added!", { id: toastId });
      return true;
    } catch (err) {
      toast.error(err.message, { id: toastId });
      return false;
    }
  }, []);

  // --- Toggle ---
  const toggleTask = useCallback(async (id) => {
    // Optimistic update
    setTasks((prev) =>
      asTaskArray(prev).map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );
    try {
      const { data } = await taskApi.toggle(id);
      setTasks((prev) =>
        asTaskArray(prev).map((t) => (t._id === id ? data?.data ?? t : t))
      );
    } catch (err) {
      // Revert on failure
      setTasks((prev) =>
        asTaskArray(prev).map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
      );
      toast.error(err.message);
    }
  }, []);

  // --- Edit ---
  const editTask = useCallback(async (id, title) => {
    const toastId = toast.loading("Saving…");
    try {
      const { data } = await taskApi.update(id, { title });
      setTasks((prev) =>
        asTaskArray(prev).map((t) => (t._id === id ? data?.data ?? t : t))
      );
      toast.success("Task updated!", { id: toastId });
      return true;
    } catch (err) {
      toast.error(err.message, { id: toastId });
      return false;
    }
  }, []);

  // --- Delete ---
  const deleteTask = useCallback(async (id) => {
    setTasks((prev) => asTaskArray(prev).filter((t) => t._id !== id));
    try {
      await taskApi.remove(id);
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.message);
      fetchTasks(); // re-sync on error
    }
  }, [fetchTasks]);

  // --- Filtered view ---
  const safeTasks = asTaskArray(tasks);

  const filteredTasks = safeTasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending")   return !t.completed;
    return true;
  });

  const counts = {
    all:       safeTasks.length,
    completed: safeTasks.filter((t) => t.completed).length,
    pending:   safeTasks.filter((t) => !t.completed).length,
  };

  return {
    tasks: filteredTasks,
    loading,
    error,
    filter,
    setFilter,
    counts,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    refetch: fetchTasks,
  };
}

export { useTasks };
export default useTasks;
