import { useState, useEffect, useRef } from "react";
import { useTasks } from "../context/TaskContext";

export default function Focus() {
  const { tasks } = useTasks();
  
  // States
  const [mode, setMode] = useState("timer"); // "timer" or "stopwatch"
  const [time, setTime] = useState(25 * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [goal, setGoal] = useState("");
  const [customMins, setCustomMins] = useState("");

  // Get only pending tasks for the helper dropdown
  const pendingTasks = tasks.filter(t => t.status !== "completed");

  // Audio for timer completion
  const alarmAudio = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg"));

  /* ======================
     TIMER LOGIC
  ====================== */
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          // Timer Mode (Countdown)
          if (mode === "timer") {
            if (prevTime <= 1) {
              clearInterval(interval);
              setIsActive(false);
              alarmAudio.current.play().catch(e => console.log("Audio play blocked by browser"));
              alert("Focus session complete! Great job.");
              return 0;
            }
            return prevTime - 1;
          } 
          // Stopwatch Mode (Count up)
          else {
            return prevTime + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, mode]);

  /* ======================
     CONTROLS
  ====================== */
  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "timer") {
      setTime(25 * 60); // Default to 25m
    } else {
      setTime(0);
    }
  };

  const setPreset = (minutes) => {
    setMode("timer");
    setIsActive(false);
    setTime(minutes * 60);
  };

  const applyCustomTime = (e) => {
    e.preventDefault();
    if (customMins > 0) {
      setPreset(Number(customMins));
      setCustomMins("");
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setTime(newMode === "timer" ? 25 * 60 : 0);
  };

  const handleTaskSelect = (e) => {
    const selectedTitle = e.target.options[e.target.selectedIndex].text;
    if (e.target.value) {
      setGoal(selectedTitle);
    }
  };

  /* ======================
     FORMATTING
  ====================== */
  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <section style={{ maxWidth: '700px', margin: '0 auto', paddingTop: '2rem', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Focus Mode</h2>
        <p className="text-muted">Eliminate distractions. Achieve your goals.</p>
      </div>

      {/* Main Glass Card */}
      <div className="glass" style={{ padding: '3rem 2rem', borderRadius: '30px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle glowing background orb specific to the card */}
        <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: isActive ? 'var(--brand)' : 'var(--text-muted)', filter: 'blur(100px)', opacity: '0.15', zIndex: '-1', transition: 'background 0.5s ease' }} />

        {/* Goal Setting */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="What are you focusing on?" 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={{ width: '100%', maxWidth: '400px', padding: '1rem', borderRadius: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: '1.1rem', textAlign: 'center', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
          />
          
          <select 
            onChange={handleTaskSelect}
            style={{ width: '100%', maxWidth: '400px', padding: '0.5rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
          >
            <option value="">-- Or auto-fill from pending tasks --</option>
            {pendingTasks.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
          </select>
        </div>

        {/* Mode Switcher */}
        <div style={{ display: 'inline-flex', background: 'var(--bg-soft)', padding: '0.3rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <button 
            onClick={() => switchMode("timer")} 
            style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: '600', color: mode === "timer" ? 'var(--text)' : 'var(--text-muted)', background: mode === "timer" ? 'var(--surface)' : 'transparent', boxShadow: mode === "timer" ? 'var(--shadow-sm)' : 'none' }}
          >
            Timer
          </button>
          <button 
            onClick={() => switchMode("stopwatch")} 
            style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: '600', color: mode === "stopwatch" ? 'var(--text)' : 'var(--text-muted)', background: mode === "stopwatch" ? 'var(--surface)' : 'transparent', boxShadow: mode === "stopwatch" ? 'var(--shadow-sm)' : 'none' }}
          >
            Stopwatch
          </button>
        </div>

        {/* Massive Time Display */}
        <div style={{ 
          fontSize: '7rem', 
          fontWeight: '800', 
          fontFamily: 'monospace', 
          letterSpacing: '-0.05em', 
          color: isActive ? 'var(--brand)' : 'var(--text)', 
          textShadow: isActive ? '0 0 40px color-mix(in srgb, var(--brand) 40%, transparent)' : 'none',
          transition: 'all 0.3s ease',
          lineHeight: '1',
          marginBottom: '2.5rem'
        }}>
          {formatTime(time)}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={toggleTimer} 
            style={{ 
              fontSize: '1.2rem', padding: '1rem 3rem', borderRadius: '99px', fontWeight: 'bold', border: 'none', color: 'white',
              background: isActive ? 'var(--warning, #f59e0b)' : 'var(--brand)',
              boxShadow: isActive ? '0 4px 15px rgba(245, 158, 11, 0.4)' : '0 4px 15px color-mix(in srgb, var(--brand) 40%, transparent)',
              transform: isActive ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.2s ease', cursor: 'pointer'
            }}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          
          <button 
            className="btn-secondary" 
            onClick={resetTimer} 
            style={{ borderRadius: '99px', padding: '1rem 2rem' }}
          >
            Reset
          </button>
        </div>

        {/* Custom Timer Presets (Only show in Timer mode) */}
        {mode === "timer" && !isActive && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Presets:</span>
            <button className="btn-icon" style={{ borderRadius: '8px', padding: '0.4rem 0.8rem', width: 'auto', height: 'auto', background: 'var(--bg-soft)' }} onClick={() => setPreset(15)}>15m</button>
            <button className="btn-icon" style={{ borderRadius: '8px', padding: '0.4rem 0.8rem', width: 'auto', height: 'auto', background: 'var(--bg-soft)' }} onClick={() => setPreset(25)}>25m</button>
            <button className="btn-icon" style={{ borderRadius: '8px', padding: '0.4rem 0.8rem', width: 'auto', height: 'auto', background: 'var(--bg-soft)' }} onClick={() => setPreset(50)}>50m</button>
            
            <form onSubmit={applyCustomTime} style={{ display: 'flex', gap: '4px', marginLeft: '0.5rem' }}>
              <input 
                type="number" 
                min="1" 
                max="300"
                placeholder="Custom" 
                value={customMins}
                onChange={(e) => setCustomMins(e.target.value)}
                style={{ width: '80px', padding: '0.4rem', borderRadius: '8px', background: 'var(--bg-soft)', border: '1px solid var(--border)', color: 'var(--text)', textAlign: 'center', outline: 'none' }}
              />
              <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--brand)', cursor: 'pointer', fontWeight: 'bold' }}>Set</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}