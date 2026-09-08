import React, { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    alert("Login successful!");
    onLoginSuccess();
  };

  return (
    <div className="login-page">

      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">🌱</div>

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Login to continue to FarmOrbit
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <p className="register-text">
            Don't have an account?
            <a href="/"> Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;