import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "../App.css";

export default function Settings() {
  const { user, logout } = useAuth();
  const { fontScale, setFontScale } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <section className="settings-page">
      <h2>Settings</h2>

      <div className="settings-card">
        {/* User Info */}
        <p>
          <strong>Email:</strong>{" "}
          {user?.email || "Not available"}
        </p>
        <p>Password: ********</p>

        <hr />

        {/* Font Size */}
        <div className="setting-control">
          <label>Font Size</label>
          <input
            type="range"
            min="0.9"
            max="1.3"
            step="0.05"
            value={fontScale}
            onChange={(e) =>
              setFontScale(Number(e.target.value))
            }
          />
          <span>{Math.round(fontScale * 100)}%</span>
        </div>

        <hr />

        {/* Actions */}
        <button
          className="btn-secondary"
          onClick={() =>
            alert("Password reset flow coming soon.")
          }
        >
          Reset Password
        </button>

        <button
          className="danger-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}