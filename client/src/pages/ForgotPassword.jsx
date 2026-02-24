import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI-only placeholder (You can connect this to backend later)
    setMessage("If an account exists, a reset link has been sent.");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        
        {/* 🦉 The Owl (Just sitting there looking cute, no sunglasses needed here) */}
        <div className="owl-wrapper"></div>

        {/* 🪟 THE CARD */}
        <div className="auth-card-content">
          
          <div className="auth-header">
            <h2>Forgot Password</h2>
            <p>Enter your email to receive a reset link.</p>
          </div>

          {/* Success Message display */}
          {message && <p className="auth-success">{message}</p>}

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

            <button type="submit" className="auth-btn-massive">
              Send Reset Link
            </button>
            
          </form>

          <div className="auth-links" style={{ marginTop: '2rem' }}>
            <Link to="/login">← Back to Login</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}