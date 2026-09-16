import { useState } from "react";
import './Register.css';
import registerFarm from "../assets/register-farm.png";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../Languagecontext";  
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = (e) => {

  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert(t("passwordsDontMatch"));
    return;
  }

  // Email must have text after the dot
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(formData.email)) {
    alert(t("invalidEmail"));
    return;
  }

  console.log("Registration Data:", formData);

  alert(t("registrationSuccessful"));

  navigate("/");
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

            <div className="input-group">
              <label>{t("fullName")}</label>
              <input
                type="text"
                name="name"
                placeholder={t("enterFullName")}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("emailAddress")}</label>
              <input
                type="email"
                name="email"
                placeholder={t("enterEmail")}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("phoneNumber")}</label>
              <input
                type="tel"
                name="phone"
                placeholder={t("enterPhoneNumber")}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("iAmA")}</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Farmer">{t("farmerRole")}</option>
                <option value="Buyer">{t("buyerRole")}</option>
                <option value="Agriculture Expert">
                  {t("expertRole")}
                </option>
              </select>
            </div>

            <div className="input-group">
              <label>{t("password")}</label>
              <input
                type="password"
                name="password"
                placeholder={t("createPassword")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>{t("confirmPasswordLabel")}</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder={t("confirmYourPassword")}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn">
             {t("Create Account")}
            </button>

          </form>

          <p className="login-text">
            {t("alreadyHaveAccount")}
            <Link to="/login">{t("login")} </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;