import { useTasks } from "../../context/TaskContext";
import "../../styles/task-list.css";

export default function TaskList() {
  const { filteredTasks, updateTaskStatus, deleteTask } = useTasks(); // 👈 Uses filteredTasks now

  if (filteredTasks.length === 0) {
    return <div className="task-empty"><p>No tasks found for this view.</p></div>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <div key={task._id} className="task-card" style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          
          <div style={{flex:1}}>
            <h4 className={`task-title ${task.status === "completed" ? "completed-text" : ""}`}>
              {task.title}
            </h4>
            <div className="task-meta" style={{justifyContent:'flex-start', gap:'10px', borderTop:'none', paddingTop:0}}>
              <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
              {task.category !== "None" && <span style={{fontSize:'0.75rem', color:'var(--brand)'}}>• {task.category}</span>}
              <span className="meta-date">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}</span>
            </div>
          </div>

          <div className="task-actions" style={{ display: "flex", gap: "10px", alignItems:'center' }}>
            {/* IN PROGRESS SELECTOR */}
            <select 
              value={task.status}
              onChange={(e) => updateTaskStatus(task._id, e.target.value)}
              style={{
                padding:'0.4rem 0.8rem', borderRadius:'8px', background:'var(--bg)', 
                border:'1px solid var(--border)', color:'var(--text)', outline:'none', cursor:'pointer'
              }}
            >
              <option value="todo">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed ✓</option>
            </select>

            <button className="danger-btn" onClick={() => deleteTask(task._id)} style={{padding:'0.4rem 0.8rem'}}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}