import "./profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">
        <h2>Farmer Profile</h2>
        <p>My personal information</p>

        <table>
          <tbody>
            <tr>
              <td>Full Name</td>
              <td>Rahul Kumar</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>rahul@example.com</td>
            </tr>

            <tr>
              <td>Phone Number</td>
              <td>9876543210</td>
            </tr>

            <tr>
              <td>Village</td>
              <td>Rampur</td>
            </tr>

            <tr>
              <td>District</td>
              <td>Bareilly</td>
            </tr>

            <tr>
              <td>State</td>
              <td>Uttar Pradesh</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Profile;