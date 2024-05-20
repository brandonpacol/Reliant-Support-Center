import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

/** The Login Page shown as the main index screen */
function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(false);
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(false);
    setPassword(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (result.ok) {
        console.log("Successful login!");
        navigate("/tickets");
      } else {
        console.error("Error logging in.");
        setError(true);
      }

    } catch (err) {
      console.error("Error logging in: ", err);
      setError(true);
    }
  }

  return (
    <div className="page-container" id="login-page">
      <div className="form-container" id="login-form-container">
        <h1>Reliant Support Center</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" onChange={handleUsernameChange} required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handlePasswordChange} required />
          {error && <span className="error-msg">Incorrect username or password. Please try again.</span>}
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;