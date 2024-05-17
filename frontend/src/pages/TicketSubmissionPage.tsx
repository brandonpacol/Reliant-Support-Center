import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function TicketSubmissionPage() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState(3);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDesc(event.target.value);
  }

  function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const priorityNum = parseInt(event.target.value);
    if (!isNaN(priorityNum)) setPriority(priorityNum);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const result = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: desc,
          priority: priority
        })
      });

      if (result.ok) {
        console.log("Successful ticket submission!");
        navigate("/tickets");
      } else {
        console.error("Error submitting ticket.");
      }

    } catch (err) {
      console.error("Error submitting ticket: ", err);
    }
  }

  return (
    <>
      <Navbar />

      <div style={{padding: "1em", display: "flex" , justifyContent: "center", alignItems: "center"}}>

        <div style={{backgroundColor: "#00000010", padding: "2em", borderRadius: "1em", width: "75%"}}>
          <h2 style={{marginTop: 0}}>Submit a New Ticket</h2>

          <hr />

          <form onSubmit={handleSubmit}>

            <div style={{marginBottom: "1em", marginTop: "2em", display: "flex", paddingTop: "0.5em"}}>
              <label style={{flex: "0 0 8em"}} htmlFor="subject">Subject:</label>
              <input style={{flex: 1, padding: "0.5em"}} type="text" id="subject" name="subject" value={title} onChange={handleTitleChange} />
            </div>

            <div style={{marginBottom: "1em", display: "flex" }}>
              <label style={{flex: "0 0 8em", paddingTop: "0.5em" }} htmlFor="description">Description:</label>
              <textarea style={{flex: 1, padding: "0.5em"}} id="description" name="description" rows={5} value={desc} onChange={handleDescChange} />
            </div>

            <div style={{marginBottom: "1em", display: "flex"}}>
              <label style={{flex: "0 0 8em", paddingTop: "0.5em" }} htmlFor="priority">Priority:</label>
              <select style={{padding: "0.5em"}} id="priority" name="priority" value={priority} onChange={handlePriorityChange}>
                <option value="3">Low</option>
                <option value="2">Medium</option>
                <option value="1">High</option>
              </select>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <button style={{backgroundColor: "#5D7790", color: "white", padding: "0.5em", borderRadius: "0.5em", fontSize: "1em"}} type="submit">Submit</button>
            </div>

          </form>
        </div>

      </div>

    </>
    
  )
}

export default TicketSubmissionPage;