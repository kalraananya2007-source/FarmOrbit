
import { useState } from "react";
import "./Register.css";
import registerFarm from "../assets/register-farm.png";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Languagecontext";
import VoiceInput, {
  spokenToEmail,
  spokenToPhone,
} from "../VoiceInput";

function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Farmer",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update one field without overwriting the other fields.
  const setField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert(t("fillAllFields"));
      return;
    }

    if (password !== confirmPassword) {
      alert(t("passwordsDontMatch"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert(t("invalidEmail"));
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            role: formData.role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Save the authentication session returned by the backend.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(data.message || t("registrationSuccessful"));

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.message || "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <img
          src={registerFarm}
          alt="FarmOrbit farming"
          className="register-image"
        />
      </div>

      <div className="register-right">
        <div className="register-card">
          <h2>{t("createAccount")}</h2>

          <p className="register-subtitle">
            {t("joinFarmOrbitToday")}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Full name */}
            <div className="input-group">
              <label htmlFor="name">{t("fullName")}</label>

              <div className="input-with-voice">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("enterFullName")}
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />

                <VoiceInput
                  onResult={(text) => setField("name", text)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">{t("emailAddress")}</label>

              <div className="input-with-voice">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("enterEmail")}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

                <VoiceInput
                  onResult={(text) =>
                    setField("email", spokenToEmail(text))
                  }
                />
              </div>
            </div>

            {/* Phone */}
            <div className="input-group">
              <label htmlFor="phone">{t("phoneNumber")}</label>

              <div className="input-with-voice">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("enterPhoneNumber")}
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                />

                <VoiceInput
                  onResult={(text) =>
                    setField("phone", spokenToPhone(text))
                  }
                />
              </div>
            </div>

            {/* Role */}
            <div className="input-group">
              <label htmlFor="role">{t("iAmA")}</label>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Farmer">{t("farmerRole")}</option>
                <option value="Buyer">{t("buyerRole")}</option>
                <option value="Agriculture Expert">
                  {t("expertRole")}
                </option>
              </select>
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">{t("password")}</label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("createPassword")}
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {/* Confirm password */}
            <div className="input-group">
              <label htmlFor="confirmPassword">
                {t("confirmPasswordLabel")}
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t("confirmYourPassword")}
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={submitting}
            >
              {submitting
                ? "Creating account..."
                : t("createAccountBtn")}
            </button>
          </form>

          <p className="login-text">
            {t("alreadyHaveAccount")}
            <Link to="/login"> {t("login")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
