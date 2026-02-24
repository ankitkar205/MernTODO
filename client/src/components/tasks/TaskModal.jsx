import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import "../../styles/task-modal.css";

export default function TaskModal({ onClose }) {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("None");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title is required");
    try {
      setLoading(true);
      await addTask({ title, description, priority, category, dueDate });
      onClose();
    } catch (err) { alert("Failed to create task"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="task-modal-backdrop">
      <div className="task-modal">
        <header className="task-modal-header">
          <h3>Create Task</h3>
          <button className="task-modal-close" onClick={onClose}>✕</button>
        </header>

        <form className="task-modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option><option value="medium">Medium</option>
                <option value="high">High</option><option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="None">None</option><option value="Personal">Personal</option>
                <option value="Work">Work</option><option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
              <label>Due date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <footer className="task-modal-footer">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={loading}>Create Task</button>
          </footer>
        </form>
      </div>
    </div>
  );
}