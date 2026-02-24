import Task from "../models/Task.js";

/* =========================
   CREATE TASK
========================= */
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, category, status } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      user: req.user.id,
      title,
      description: description || "",
      priority: priority || "medium",
      status: status || "todo",
      category: category || "None",
      dueDate: dueDate || null,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

/* =========================
   GET TASKS
========================= */
export const getTasks = async (req, res) => {
  try {
    // 🔥 CRITICAL FIX: Filter by req.user.id
    // If you remove this object, it returns ALL tasks in the database.
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

/* =========================
   UPDATE TASK
========================= */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

/* =========================
   DELETE TASK
========================= */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};