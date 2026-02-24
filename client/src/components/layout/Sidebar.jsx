import { useNavigate, useLocation } from "react-router-dom";
import { useTasks } from "../../context/TaskContext";

const menuItems = [
  { id: "All Tasks", icon: "⊞" },
  { id: "Today", icon: "⚙" },
  { id: "Upcoming", icon: "📅" },
  { id: "Completed", icon: "✓" },
];

const categories = [
  { id: "Personal", color: "#6366f1" },
  { id: "Work", color: "#f43f5e" },
  { id: "Shopping", color: "#10b981" },
  { id: "Health", color: "#f59e0b" },
];

export default function Sidebar() {
  const { activeFilter, setActiveFilter, tasks } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    if (location.pathname !== "/todos") navigate("/todos");
  };

  return (
    <div className="sidebar-root">
      <div className="sidebar-header" onClick={() => navigate("/dashboard")} style={{cursor:'pointer'}}>
        <div className="sidebar-logo-icon">T</div>
        <div className="sidebar-brand-text">
          <span className="sidebar-logo">todoMern</span>
        </div>
      </div>

      <div className="sidebar-section-title">MENU</div>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li onClick={() => navigate('/dashboard')} className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-label">Dashboard</span>
          </li>
          <li onClick={() => navigate('/focus')} className={`sidebar-link ${location.pathname === '/focus' ? 'active' : ''}`}>
            <span className="sidebar-icon">⏱</span>
            <span className="sidebar-label">Focus Mode</span>
          </li>

          <div className="sidebar-divider" style={{margin:'1rem 0', background:'transparent'}} />

          {menuItems.map((item) => {
            const count = item.id === "Completed" ? tasks.filter(t=>t.status==='completed').length : null;
            return (
              <li key={item.id} onClick={() => handleFilterClick(item.id)} className={`sidebar-link ${activeFilter === item.id && location.pathname === '/todos' ? "active" : ""}`}>
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label" style={{flex:1}}>{item.id}</span>
                {count !== null && <span className="sidebar-count">{count}</span>}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-section-title" style={{marginTop:'1.5rem'}}>CATEGORIES</div>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          {categories.map((cat) => (
            <li key={cat.id} onClick={() => handleFilterClick(cat.id)} className={`sidebar-link ${activeFilter === cat.id && location.pathname === '/todos' ? "active" : ""}`}>
              <div style={{width:'8px', height:'8px', borderRadius:'50%', background:cat.color, marginRight:'12px'}}></div>
              <span className="sidebar-label">{cat.id}</span>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{marginTop:'auto'}}>
        <li onClick={() => navigate('/settings')} className="sidebar-link">
          <span className="sidebar-icon">⚙️</span>
          <span className="sidebar-label">Settings</span>
        </li>
      </div>
    </div>
  );
}