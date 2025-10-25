import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";

export default function Login({ setLoggedIn, setUserId }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

const handleSave = async (e) => {
  e.preventDefault();
  try {
    const user = await loginUser({ name: userName, password });

    if (user._id) { // only update state if login was successful
      setLoggedIn(true);
      setUserId(user._id);
      toastr.success("Logged in!", "Success");
      navigate("/");
    } else {
      // login failed
      setError(user.message || "Invalid credentials");
      toastr.error("Please try again", "Error");
    }
  } catch (err) {
    console.error(err);
    setError("Login failed, try again");
    toastr.error("Please try again", "Error");
  }
};

  const handleCancel = () => {
    navigate("/");
  }

  return (
    <div className="login-form">
      <h1>Welcome Back!</h1>
      <form onSubmit={handleSave}>
        <label htmlFor="userName">User Name:</label>
        <input
          id="login-username"
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
          id="login-password"
          type="password"
          name="password"
          placeholder="e.g., asdf89!!"
          maxLength={16}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Login</button>
      </form>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}
