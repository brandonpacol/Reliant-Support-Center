import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST"
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error logging out.");
      }

    } catch (err) {
      console.error("Error logging out: ", err);
    }
  }

function handleHomeClick() {
  navigate("/tickets");
}

  return (
    <div className="nav-container">
      <h1 className="nav-title" onClick={handleHomeClick} >Reliant Support Center</h1>
      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar;