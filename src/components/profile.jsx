import { useEffect, useState } from "react";
import "./profile.css";

const defaultProfile = {
  fullName: "Rahul Kumar",
  email: "rahul@example.com",
  phone: "9876543210",
  village: "Rampur",
  district: "Bareilly",
  state: "Uttar Pradesh",
};

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(defaultProfile);

  const [formData, setFormData] = useState(defaultProfile);

  const [profileImage, setProfileImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Load saved profile data when page opens
  useEffect(() => {
    const savedProfile = localStorage.getItem("farmerProfile");
    const savedImage = localStorage.getItem("farmerProfileImage");

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);

      setProfile(parsedProfile);
      setFormData(parsedProfile);
    }

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  function handleEdit() {
    setFormData(profile);
    setErrors({});
    setSuccessMessage("");
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({
        ...errors,
        profileImage: "Please select a valid image.",
      });
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);

      localStorage.setItem("farmerProfileImage", reader.result);

      setErrors({
        ...errors,
        profileImage: "",
      });
    };

    reader.readAsDataURL(file);
  }

  function validateForm() {
    const newErrors = {};

    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!namePattern.test(formData.fullName.trim())) {
      newErrors.fullName = "Full name should contain only letters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!formData.village.trim()) {
      newErrors.village = "Village is required.";
    } else if (!namePattern.test(formData.village.trim())) {
      newErrors.village = "Village should contain only letters.";
    }

    if (!formData.district.trim()) {
      newErrors.district = "District is required.";
    } else if (!namePattern.test(formData.district.trim())) {
      newErrors.district = "District should contain only letters.";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    } else if (!namePattern.test(formData.state.trim())) {
      newErrors.state = "State should contain only letters.";
    }

    return newErrors;
  }

  function handleSave(e) {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    // Update React state
    setProfile(formData);

    // Save profile data permanently
    localStorage.setItem(
      "farmerProfile",
      JSON.stringify(formData)
    );

    setIsEditing(false);
    setErrors({});
    setSuccessMessage("Profile updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  function handleCancel() {
    setFormData(profile);
    setErrors({});
    setIsEditing(false);
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Profile Picture */}
        <div className="profile-image-section">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Farmer"
              className="profile-image"
            />
          ) : (
            <div className="profile-image default-profile">
              👨‍🌾
            </div>
          )}

          {isEditing && (
            <div className="image-upload">
              <label htmlFor="profileImage">
                Change Profile Picture
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {errors.profileImage && (
                <p className="field-error">
                  {errors.profileImage}
                </p>
              )}
            </div>
          )}
        </div>

        <h2>Farmer Profile</h2>

        <p>Manage your personal information</p>

        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSave}>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

              {errors.fullName && (
                <p className="field-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              {errors.email && (
                <p className="field-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                required
              />

              {errors.phone && (
                <p className="field-error">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="village">Village</label>

              <input
                id="village"
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder="Enter your village"
                required
              />

              {errors.village && (
                <p className="field-error">
                  {errors.village}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="district">District</label>

              <input
                id="district"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter your district"
                required
              />

              {errors.district && (
                <p className="field-error">
                  {errors.district}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>

              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                required
              />

              {errors.state && (
                <p className="field-error">
                  {errors.state}
                </p>
              )}
            </div>

            <div className="profile-actions">
              <button type="submit" className="save-btn">
                Save Profile
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

          </form>
        ) : (
          <>
            <table>
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>{profile.fullName}</td>
                </tr>

                <tr>
                  <td>Email</td>
                  <td>{profile.email}</td>
                </tr>

                <tr>
                  <td>Phone Number</td>
                  <td>{profile.phone}</td>
                </tr>

                <tr>
                  <td>Village</td>
                  <td>{profile.village}</td>
                </tr>

                <tr>
                  <td>District</td>
                  <td>{profile.district}</td>
                </tr>

                <tr>
                  <td>State</td>
                  <td>{profile.state}</td>
                </tr>
              </tbody>
            </table>

            <button
              className="edit-btn"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Profile;