import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TaskModal from "../tasks/TaskModal";

export default function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-root">
      {/* Sidebar Area */}
      <aside className="app-sidebar">
        <Sidebar />
      </aside>

      {/* Main Application Area */}
      <section className="app-container">
        {/* Top Navigation */}
        <header className="app-topbar">
          <Topbar onAddTask={openModal} />
        </header>

        {/* Routed Page Content */}
        <main className="app-page">
          <Outlet context={{ openModal }} />
        </main>
      </section>

      {/* Global Task Modal */}
      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}
