import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
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
      }

    } catch (err) {
      console.error("Error logging in: ", err);
    }
  }

  return (
    <>
      <h1>Reliant Support Center</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br/>
        <input type="text" id="username" name="username" onChange={handleUsernameChange}/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} /><br/><br/>
        <input type="submit" value="Login"/>
      </form>
    </>
  )
}

export default LoginPage;