import TaskCard from "./TaskCard";
import { useTasks } from "../../context/TaskContext";

const COLUMNS = [
  { key: "todo", title: "To Do" },
  { key: "in-progress", title: "In Progress" },
  { key: "completed", title: "Completed" },
];

export default function TaskBoard() {
  const { tasks, toggleComplete, deleteTask } = useTasks();

  return (
    <section className="task-board">
      {COLUMNS.map((column) => (
        <div key={column.key} className="board-column">
          <header className="board-column-header">
            <h4>{column.title}</h4>
          </header>

          <div className="board-column-body">
            {tasks
              .filter((task) => task.status === column.key)
              .map((task) => (
                <TaskCard
                  key={task._id} // MongoDB uses _id
                  task={task}
                  onComplete={toggleComplete} // Matched with context
                  onDelete={deleteTask}
                />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}