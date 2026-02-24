export function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function buildActivityStats(tasks) {
  const days = getLast7Days();

  return days.map((day) => {
    const dailyTasks = tasks.filter(
      (t) => t.createdAt?.slice(0, 10) === day
    );

    return {
      date: day,
      total: dailyTasks.length,
      completed: dailyTasks.filter(
        (t) => t.status === "completed"
      ).length,
    };
  });
}