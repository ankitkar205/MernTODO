import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import "../App.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // 😎 State for the Sunglasses
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api.login(email, password);
      login({ user: data.user, token: data.token });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        
        {/* 🦉 OWL & SUNGLASSES (Z-Index: 1) */}
        <div className={`owl-wrapper ${isPasswordFocused ? "is-focused" : ""}`}>
          <img 
            src="/sunglasses.png" 
            alt="Deal With It" 
            className="owl-sunglasses" 
          />
        </div>

        {/* 🪟 GLASS CARD (Z-Index: 2) */}
        <div className="auth-card-content">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your workspace.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                // 😎 Triggers the sunglasses drop
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="auth-btn-massive" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <span>Don’t have an account? <Link to="/register">Create one</Link></span>
          </div>
        </div>

      </div>
    </div>
  );
}