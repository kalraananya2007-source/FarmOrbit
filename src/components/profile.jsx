import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <h2>Farmer Profile</h2>

      <table border="1" cellPadding="10">
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>Ananya Kalra</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>farmer@example.com</td>
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
            <td>Delhi</td>
          </tr>

          <tr>
            <td>State</td>
            <td>Delhi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;