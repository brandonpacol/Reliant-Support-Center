import { useNavigate } from "react-router-dom";

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
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#5D7790", padding: "0.5em" }}>
      <h1 onClick={handleHomeClick} style={{color: "white", cursor: "pointer"}}>Reliant Support Center</h1>
      <button
        style={{padding: "0.5em", backgroundColor: "transparent", fontSize: "1em", fontWeight: "bold", borderRadius: "0.5em", color: "white", borderColor: "white", borderWidth: "0.1em", borderStyle: "solid" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar;