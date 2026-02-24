import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import MiniCalendar from "../components/layout/MiniCalendar"; // 👈 Imported Mini Calendar
import "../styles/dashboard.css";

/* ======================
   HELPERS
====================== */
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
};

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading } = useTasks();

  /* ======================
     STATS
  ====================== */
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = total - completed;

  /* ======================
     UPCOMING TASKS
  ====================== */
  const upcoming = useMemo(() => {
    return tasks
      .filter(t => t.status !== "completed")
      .sort((a, b) => {
        if (!a.dueDate && b.dueDate) return 1;
        if (a.dueDate && !b.dueDate) return -1;
        if (!a.dueDate && !b.dueDate) return 0;
        return new Date(a.dueDate) - new Date(b.dueDate);
      })
      .slice(0, 3);
  }, [tasks]);

  /* ======================
     ACTIVITY (7 DAYS)
  ====================== */
  const activityData = useMemo(() => {
    const days = getLast7Days();

    return days.map(day => {
      const daily = tasks.filter(
        t => t.createdAt?.slice(0, 10) === day
      );

      return {
        date: day,
        total: daily.length,
        completed: daily.filter(t => t.status === "completed").length,
      };
    });
  }, [tasks]);

  const maxTasks = Math.max(...activityData.map(d => d.total), 1);

  const linePoints = activityData
    .map((d, i) => {
      const x = (i / 6) * 300;
      const y = 100 - (d.completed / maxTasks) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  /* ======================
     RENDER
  ====================== */
  return (
    <section className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h2>
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h2>
          <p className="text-muted">
            Here’s what’s happening today.
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card total">
          <span className="stat-label">Total Tasks</span>
          <strong className="stat-value">{total}</strong>
        </div>

        <div className="stat-card pending">
          <span className="stat-label">Pending</span>
          <strong className="stat-value">{pending}</strong>
        </div>

        <div className="stat-card completed">
          <span className="stat-label">Completed</span>
          <strong className="stat-value">{completed}</strong>
        </div>
      </div>

      {/* Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column: Upcoming */}
        <div className="dashboard-section card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>Upcoming Tasks</h3>

          <div className="upcoming-list" style={{ flex: 1 }}>
            {loading ? (
              <p className="text-muted text-center py-4">
                Loading tasks…
              </p>
            ) : upcoming.length === 0 ? (
              <p className="text-muted text-center py-4">
                No upcoming tasks
              </p>
            ) : (
              upcoming.map(task => (
                <div key={task._id} className="upcoming-item">
                  <div className="upcoming-info">
                    <span className="upcoming-title">
                      {task.title}
                    </span>
                    <span className="upcoming-date text-muted">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </div>

                  <span
                    className={`priority-badge priority-${task.priority}`}
                  >
                    {task.status === 'in-progress' ? 'In Progress' : task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Mini Calendar + Activity Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* 📅 Mini Calendar component injected here */}
          <MiniCalendar />

          {/* Activity Bars */}
          <div className="dashboard-section card" style={{ flex: 1 }}>
            <h3>Activity</h3>

            <div className="activity-placeholder">
              {activityData.map((d, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{
                    height: `${Math.min(d.total * 20, 100)}%`,
                  }}
                  title={`${d.total} tasks on ${d.date}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Completion Graph */}
      <div className="activity-graph">
        <div className="graph-header">
          <span>Task completion over time</span>
          <div className="graph-legend">
            <span className="legend completed">Completed</span>
            <span className="legend incomplete">Incomplete</span>
          </div>
        </div>

        <svg
          className="progress-svg"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopOpacity="0.45" />
              <stop offset="100%" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <polyline
            points={`0,100 ${linePoints} 300,100`}
            fill="url(#areaGradient)"
          />

          <polyline
            points={linePoints}
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>
    </section>
  );
}