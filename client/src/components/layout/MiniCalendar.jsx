import { useState } from "react";
import { useTasks } from "../../context/TaskContext";

export default function MiniCalendar() {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const hasTask = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    return tasks.some(t => t.dueDate && t.dueDate.startsWith(checkDate) && t.status !== 'completed');
  };

  return (
    <div className="mini-calendar glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
        <div>
          <button onClick={() => changeMonth(-1)} style={{ color: 'var(--text-muted)', padding: '0 8px' }}>←</button>
          <button onClick={() => changeMonth(1)} style={{ color: 'var(--text-muted)', padding: '0 8px' }}>→</button>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center' }}>
        {blanks.map(b => <div key={`blank-${b}`} />)}
        {days.map(day => (
          <div key={day} style={{ 
            padding: '6px 0', 
            borderRadius: '50%', 
            fontSize: '0.9rem',
            background: hasTask(day) ? 'var(--brand-soft)' : 'transparent',
            color: hasTask(day) ? 'var(--brand)' : 'var(--text)',
            fontWeight: hasTask(day) ? 'bold' : 'normal',
            border: new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() ? '1px solid var(--brand)' : 'none'
          }}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}