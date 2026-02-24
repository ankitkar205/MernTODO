import { useState } from "react";
import { api } from "../../services/api";

export default function AddTaskModal({ onClose, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTask = await api.createTask({
        title,
        description,
        priority,
        status: "pending",
      });

      onTaskAdded(newTask);   // 🔥 notify dashboard
      onClose();
    } catch (err) {
      console.error("Failed to create task", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Task</h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Task title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" className="btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}