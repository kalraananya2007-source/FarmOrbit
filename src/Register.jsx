import { useState } from "react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Farmer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);
    alert("Registration successful!");
  };

  return (
    <div className="register-page">

      <div className="register-left">
        <div className="farmorbit-logo">
          🌱 FarmOrbit
        </div>

        <div className="register-content">
          <h1>Grow with FarmOrbit</h1>

          <p>
            Connect with farmers, discover smart farming solutions,
            and make your farming journey easier.
          </p>

          <div className="register-features">
            <div>🌾 Smart Farming</div>
            <div>📈 Better Market Access</div>
            <div>🤝 Farmer Community</div>
          </div>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">

          <h2>Create Account</h2>
          <p className="register-subtitle">
            Join FarmOrbit today
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>I am a</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Farmer">Farmer</option>
                <option value="Buyer">Buyer</option>
                <option value="Agriculture Expert">
                  Agriculture Expert
                </option>
              </select>
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>

          </form>

          <p className="login-text">
            Already have an account?
            <span> Login</span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;