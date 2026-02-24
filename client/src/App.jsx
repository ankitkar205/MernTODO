import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/variables.css";
import "./index.css";
import "./App.css";
import "./styles/layout.css";
import "./styles/modal.css";
import "./styles/sidebar.css";
import "./styles/topbar.css";
import "./styles/task-card.css";
import "./styles/buttons.css";
import "./styles/todos.css";
import "./styles/task-list.css";
import "./styles/task-board.css";
import "./styles/dashboard.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Settings from "./pages/Settings";
import Focus from "./pages/Focus"; // 👈 Added

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/" element={<ProtectedRoute><TaskProvider><AppLayout /></TaskProvider></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="todos" element={<Todos />} />
              <Route path="focus" element={<Focus />} />  {/* 👈 Added */}
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}