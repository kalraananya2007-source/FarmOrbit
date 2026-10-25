
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useLanguage } from "../Languagecontext";
import VoiceInput, { spokenToEmail } from "../VoiceInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (submitting) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      alert(t("fillAllFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(normalizedEmail)) {
      alert(t("invalidEmail"));
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      if (!data.token || !data.user) {
        throw new Error("The server returned an invalid login response.");
      }

      // Store the authentication session.
      // Remember me controls whether the session survives browser restarts.
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data.user));

      // Remove any previous session from the other storage.
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem("token");
      otherStorage.removeItem("user");

      alert(data.message || t("loginSuccessful"));

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.message || "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
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
            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">
                {t("emailAddress")}
              </label>

              <div className="input-with-voice">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("enterEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />

                <VoiceInput
                  onResult={(text) => setEmail(spokenToEmail(text))}
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">
                {t("password")}
              </label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder={t("enterPassword")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword
                    ? t("hidePassword")
                    : t("showPassword")}
                </button>
              </div>
            </div>

            {/* Remember me and forgot password */}
            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                {t("rememberMe")}
              </label>

              <Link to="/forgot-password">
                {t("forgotPassword")}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-button"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : t("loginButton")}
            </button>
          </form>

          <div className="divider">
            <span>{t("or")}</span>
          </div>

          <p className="register-text">
            {t("dontHaveAccount")}
            <Link to="/register">
              {" "}{t("createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
