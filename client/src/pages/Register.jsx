import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../App.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 😎 State for the Sunglasses
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.register(name, email, password);
      setSuccess("Account created successfully. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Registration failed");
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
            <h2>Create Account</h2>
            <p>Join us and start organizing your work.</p>
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                placeholder="Create Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                // 😎 Triggers the sunglasses drop
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </div>

            <button type="submit" className="auth-btn-massive" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-links" style={{ marginTop: '1.5rem' }}>
            <span>Already have an account? <Link to="/login">Login</Link></span>
          </div>
        </div>

      </div>
    </div>
  );
}