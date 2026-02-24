import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { PlusIcon, SunIcon, MoonIcon } from "../Icons";

export default function Topbar({ onAddTask }) {
  const { dark, setDark } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("todos")) return "My Tasks";
    if (path.includes("settings")) return "Settings";
    return "My Workspace";
  };

  return (
    <div className="topbar-root">
      <div className="topbar-left">
        <h3 className="topbar-title">{getPageTitle()}</h3>
      </div>

      <div className="topbar-right">
        <button className="btn-primary btn-sm flex items-center gap-2" onClick={onAddTask}>
          <PlusIcon width={16} height={16} />
          <span>Add Task</span>
        </button>

        <div className="topbar-divider"></div>

        <button
          onClick={() => setDark(!dark)}
          className="topbar-action"
          title="Toggle Theme"
        >
          {dark ? <SunIcon width={20} height={20} /> : <MoonIcon width={20} height={20} />}
        </button>
      </div>
    </div>
  );
}
