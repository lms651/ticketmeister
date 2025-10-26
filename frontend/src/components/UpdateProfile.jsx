import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../api/users";

export default function UpdateProfile({ userId }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("mobile");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser(userId);
        setUserName(data.name ?? "");
        setAddress(data.address ?? "");
        setPhone(data.phone ?? "");
        setPhoneType(data.phoneType ?? "mobile");
      } catch (err) {
        setError(err.message);
      }
    }
    fetchUser();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { phone, phoneType, address };
      if (password) updatedData.password = password; // only update if changed
      await updateUser(userId, updatedData);
      toastr.success("Profile Updated!", "Success");
      navigate("/"); // back to home
    } catch (err) {
      setError(err.message);
      toastr.error("Failed to Update!", "Error");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="update-form">
      <h1>Update Profile</h1>
      <form onSubmit={handleSave}>
        <label htmlFor="userName">User Name:</label>
        <input
          id="update-username"
          type="text"
          name="userName"
          value={userName ?? ""}
          readOnly
        />

        <label htmlFor="password">Password:</label>
        <input
          id="update-password"
          type="password"
          name="password"
          placeholder="Enter new password to change"
          maxLength={16}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <input
          id="update-address"
          type="text"
          name="address"
          value={address ?? ""}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          id="update-phone"
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <fieldset>
          <legend>Phone Type:</legend>
          <label>
            <input
              type="radio"
              name="phoneType"
              value="mobile"
              checked={phoneType === "mobile"}
              onChange={() => setPhoneType("mobile")}
            />
            Mobile
          </label>
          <label>
            <input
              type="radio"
              name="phoneType"
              value="home"
              checked={phoneType === "home"}
              onChange={() => setPhoneType("home")}
            />
            Home
          </label>
        </fieldset>

        {error && <p className="error">{error}</p>}
        <button type="submit" style={{ backgroundColor: 'green', color: 'white' }} >Save</button>
      </form>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
    </div>
  );
}
