import { useMemo } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "../../context/TaskContext";

export default function TaskCalendar() {
  const { tasks, toggleComplete, deleteTask } = useTasks();

  const groupedByDate = useMemo(() => {
    const groups = {};

    tasks.forEach((task) => {
      const dateKey = task.dueDate ? task.dueDate : "No Deadline";

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(task);
    });

    return Object.entries(groups).sort(([dateA], [dateB]) => {
      if (dateA === "No Deadline") return 1;
      if (dateB === "No Deadline") return -1;

      return new Date(dateA) - new Date(dateB);
    });
  }, [tasks]);

  if (groupedByDate.length === 0) {
    return (
      <div className="calendar-empty">
        <p>No scheduled tasks.</p>
      </div>
    );
  }

  return (
    <section className="task-calendar">
      {groupedByDate.map(([date, dateTasks]) => (
        <div key={date} className="calendar-day">
          <header className="calendar-day-header">
            <h4>{date}</h4>
          </header>

          <div className="calendar-day-body">
            {dateTasks.map((task) => (
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