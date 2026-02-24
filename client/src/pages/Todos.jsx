import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/tasks/TaskList";
import TaskBoard from "../components/tasks/TaskBoard";

export default function Todos() {
  const { filteredTasks, activeFilter } = useTasks();
  const [view, setView] = useState("list");

  return (
    <section className="todos-page">
      <header className="todos-header">
        <div className="todos-title">
          <h2>{activeFilter}</h2>
          <p className="text-muted">{filteredTasks.length} tasks matching view</p>
        </div>

        <div className="view-switcher">
          <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>List</button>
          <button className={`view-btn ${view === "board" ? "active" : ""}`} onClick={() => setView("board")}>Board</button>
        </div>
      </header>

      <div className="todos-content">
        {view === "list" && <TaskList />}
        {view === "board" && <TaskBoard />}
      </div>
    </section>
  );
}