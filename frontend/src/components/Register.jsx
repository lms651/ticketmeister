import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";

export default function Register({ setLoggedIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("mobile");

const handleSave = async (e) => {
    e.preventDefault();
    try {
        const newUser = await registerUser({
            name: userName,
            password,
            phone,
            phoneType,
        });
        setLoggedIn(true);
        toastr.success("User Created!", "Success");
        navigate("/"); // back to home
    } catch (err) {
        setError(err.message);
        toastr.error("Please choose a different username", "Error");
    }
  }

  const handleCancel = () => {
    navigate("/");
  }

  return (
    <div className="register-form">
      <h1>Create Profile</h1>
      <form onSubmit={handleSave}>
        <label htmlFor="userName">User Name:</label>
        <input
          id="register-username"
          type="text"
          name="userName"
          maxLength={255}
          placeholder="e.g., ConcertGoer55"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="register-password"
          type="password"
          name="password"
          placeholder="e.g., asdf89!!"
          maxLength={16}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          id="register-phone"
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <fieldset>
          <legend>Phone Type</legend>
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
        <button type="submit">Save</button>
      </form>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}
