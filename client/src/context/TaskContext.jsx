import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Tasks"); // 👈 Added

  const loadTasks = useCallback(async () => {
    if (!isAuthenticated) return setTasks([]);
    setLoading(true);
    try {
      const data = await api.getTasks();
      setTasks(data || []);
    } catch (err) { setTasks([]); } 
    finally { setLoading(false); }
  }, [isAuthenticated]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const addTask = async (taskData) => {
    const created = await api.createTask(taskData);
    setTasks((prev) => [created, ...prev]);
  };

  const updateTaskStatus = async (id, newStatus) => {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)));
    try { await api.updateTask(id, { status: newStatus }); } 
    catch (e) { loadTasks(); }
  };

  const deleteTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // 🔥 FILTER LOGIC
  const filteredTasks = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    return tasks.filter(task => {
      if (activeFilter === "All Tasks") return true;
      if (activeFilter === "Today") return task.dueDate && task.dueDate.startsWith(todayStr);
      if (activeFilter === "Upcoming") return task.dueDate && task.dueDate > todayStr;
      if (activeFilter === "Completed") return task.status === "completed";
      
      // Categories
      if (["Personal", "Work", "Shopping", "Health"].includes(activeFilter)) {
        return task.category === activeFilter;
      }
      return true;
    });
  }, [tasks, activeFilter]);

  return (
    <TaskContext.Provider value={{
      tasks, filteredTasks, activeFilter, setActiveFilter, loading, 
      addTask, updateTaskStatus, deleteTask, refreshTasks: loadTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() { return useContext(TaskContext); }