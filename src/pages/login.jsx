import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useLanguage } from "../Languagecontext";
 
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
 
    if (email === "" || password === "") {
      alert(t("fillAllFields"));
      return;
    }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert(t("invalidEmail")); // add this key in your language context
    return;
  }
 
    alert(t("loginSuccessful"));
    navigate("/"); // go back to homepage on successful login
  };
 
  return (
    <div className="login-page">
 
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">🌱</div>
 
          <h1>{t("welcomeBack")}</h1>
 
          <p className="login-subtitle">
            {t("loginSubtitle")}
          </p>
 
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">{t("emailAddress")}</label>
 
              <input
                type="email"
                id="email"
                placeholder={t("enterEmail")}
              />
            </div>
 
            <div className="input-group">
              <label htmlFor="password">{t("password")}</label>
 
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={t("enterPassword")}
                />
 
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? t("hidePassword") : t("showPassword")}
                </button>
              </div>
            </div>
 
            <div className="login-options">
              <label>
                <input type="checkbox" />
                {t("rememberMe")}
              </label>
 
              <a href="/">{t("forgotPassword")}</a>
            </div>
 
            <button type="submit" className="login-button">
              {t("loginButton")}
            </button>
          </form>
 
          <div className="divider">
            <span>{t("or")}</span>
          </div>
 
          <p className="register-text">
            {t("dontHaveAccount")}
            <Link to="/register"> {t("createAccount")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
 
export default Login;