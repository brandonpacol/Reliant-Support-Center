import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BackNavigation from "../components/BackNavigation";
import { useNavigate } from "react-router-dom";
import "./TicketSubmissionPage.css";

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
        alert("There was an error submitting your ticket. Please try again.");
      }

    } catch (err) {
      console.error("Error submitting ticket: ", err);
      alert("There was an error submitting your ticket. Please try again.");
    }
  }

  return (
    <>
      <Navbar />

      <div id="ticket-submission-page" className="page-container">
        
        <BackNavigation />

        <div className="form-container">
          <h2>Submit a New Ticket</h2>

          <hr />

          <form onSubmit={handleSubmit}>

            <div className="input-container">
              <label htmlFor="subject">Subject:</label>
              <input className="input-field" type="text" id="subject" name="subject" value={title} onChange={handleTitleChange} required />
            </div>

            <div className="input-container">
              <label htmlFor="description">Description:</label>
              <textarea className="input-field" id="description" name="description" rows={5} value={desc} onChange={handleDescChange} required />
            </div>

            <div className="input-container">
              <label htmlFor="priority">Priority:</label>
              <select id="priority-select" className="input-field" name="priority" value={priority} onChange={handlePriorityChange} required >
                <option value="3">Low</option>
                <option value="2">Medium</option>
                <option value="1">High</option>
              </select>
            </div>

            <div id="submit-btn-container">
              <button className="submit-btn" type="submit">Submit</button>
            </div>

          </form>
        </div>

      </div>

    </>
    
  )
}

export default TicketSubmissionPage;