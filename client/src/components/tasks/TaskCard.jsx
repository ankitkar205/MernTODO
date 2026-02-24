import { useState } from "react";
import TaskModal from "./TaskModal";
import { EditIcon, TrashIcon } from "../Icons";
import "../../styles/task-card.css";

const PRIORITY_CLASS_MAP = {
  urgent: "priority-urgent",
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
};

export default function TaskCard({
  task,
  onComplete,
  onDelete,
  variant = "card",
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isCompleted = task.status === "completed";

  const priorityClass =
    PRIORITY_CLASS_MAP[task.priority] || "priority-medium";

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const handleToggleComplete = () => {
    onComplete(task); // Passed full task instead of task.id
  };

  const EditModal = isEditOpen && (
    <TaskModal
      isOpen={isEditOpen}
      onClose={closeEdit}
      taskToEdit={task}
    />
  );

  // ===== LIST VARIANT =====
  if (variant === "list") {
    return (
      <>
        <div className={`task-row ${isCompleted ? "completed" : ""}`}>
          <div className="task-row-left">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggleComplete}
              className="task-checkbox"
              aria-label="Mark task complete"
            />

            <div className="task-info">
              <span className="task-title" onClick={openEdit}>
                {task.title}
              </span>
              <span className="task-meta-text">
                {task.category}
              </span>
            </div>
          </div>

          <div className="task-row-right">
            <span className={`badge ${priorityClass}`}>
              {task.priority}
            </span>

            <span className="task-date">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No deadline"}
            </span>

            <div className="row-actions">
              <button
                className="btn-icon"
                onClick={openEdit}
                aria-label="Edit task"
              >
                <EditIcon width={14} height={14} />
              </button>

              <button
                className="btn-icon delete"
                onClick={() => onDelete(task._id)} // MongoDB uses _id
                aria-label="Delete task"
              >
                <TrashIcon width={14} height={14} />
              </button>
            </div>
          </div>
        </div>

        {EditModal}
      </>
    );
  }

  // ===== CARD VARIANT =====
  return (
    <>
      <article className={`task-card ${isCompleted ? "completed" : ""}`}>
        <header className="task-card-header">
          <div className="header-top">
            <span className={`badge ${priorityClass}`}>
              {task.priority}
            </span>

            <div className="card-actions">
              <button
                className="btn-icon-sm"
                onClick={openEdit}
                aria-label="Edit task"
              >
                <EditIcon width={14} height={14} />
              </button>

              <button
                className="btn-icon-sm delete"
                onClick={() => onDelete(task._id)} // MongoDB uses _id
                aria-label="Delete task"
              >
                <TrashIcon width={14} height={14} />
              </button>
            </div>
          </div>

          <h4 className="task-title" onClick={openEdit}>
            {task.title}
          </h4>
        </header>

        <section className="task-meta">
          <span className="meta-tag">{task.category}</span>
          <span className="meta-date">
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No deadline"}
          </span>
        </section>

        <footer className="task-card-footer">
          <button
            className={`btn-status ${
              isCompleted ? "btn-completed" : ""
            }`}
            onClick={handleToggleComplete}
          >
            {isCompleted ? "✓ Completed" : "○ Mark Complete"}
          </button>
        </footer>
      </article>

      {EditModal}
    </>
  );
}