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

      <div style={{padding: "1em"}}>
        <h1>New Ticket</h1>

        <form onSubmit={handleSubmit}>

          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" value={title} onChange={handleTitleChange} />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={desc} onChange={handleDescChange} />

          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={priority} onChange={handlePriorityChange}>
            <option value="3">Low</option>
            <option value="2">Medium</option>
            <option value="1">High</option>
          </select>

          <button type="submit">Submit</button>

        </form>
      </div>

    </>
    
  )
}

export default TicketSubmissionPage;