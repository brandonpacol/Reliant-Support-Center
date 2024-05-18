import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Ticket, getPriorityName } from "../types/Ticket";

function TicketsPage() {

  const navigate = useNavigate();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      try {

        const response = await fetch("/api/tickets");

        if (response.ok) {
          const data: Ticket[] = await response.json();
          setTickets(data);
        } else {
          console.error("Error fetching tickets.");
        }

      } catch (err) {
        console.error("Error fetching tickets: ", err);
      }
    }
    fetchTickets();
  }, []);

  async function handleNewTicket() {
    navigate('/submit-ticket');
  }

  return (
    <>
      <Navbar />

      <div style={{padding: "1em"}}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Tickets</h2>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <select id="status" name="status" style={{padding: "0.5em", marginRight: "1em", borderRadius: "0.5em"}}>
              <option value="">Status</option>
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>

            <select id="priority" name="priority" style={{padding: "0.5em", marginRight: "1em", borderRadius: "0.5em"}}>
              <option value="">Priority</option>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>

            <button style={{padding: "0.5em", font: "1em", borderRadius: "0.5em"}} onClick={handleNewTicket}>+ New Ticket</button>
          </div>
        </div>

        <div style={{overflow: "hidden", width: "100%", borderRadius: "0.5em", display: "block", backgroundColor: "#00000005", borderColor: "#ddd", borderWidth: "0.1em", borderStyle: "solid" }}>
          <table style={{ width: "100%" }}>
            <thead style={{ backgroundColor: "#5D7790", color: "white" }}>
              <tr style={{ fontSize: "1.1em" }}>
                <th>Subject</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Priority</th>
                <th style={{ textAlign: "center" }}>Created</th>
                <th style={{ textAlign: "center" }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                return <TableRow ticket={ticket} />
              })}
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  );
}

export default TicketsPage;

interface TableRowProps {
  ticket: Ticket
}

function TableRow({ticket}: TableRowProps) {

  const navigate = useNavigate();

  const createdTime = new Date(ticket.createdTime);
  const updatedTime = new Date(ticket.updatedTime);
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit', 
    year: 'numeric'
  };

  const priority = getPriorityName(ticket.priority) || "N/A";

  function handleRowClick() {
    if (ticket.ticketID) navigate(`/tickets/${ticket.ticketID}`);
  }

  return (
    <tr onClick={handleRowClick}>
      <td>{ticket.title}</td>
      <td><div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><span style={{backgroundColor: "#BAC550", padding: "0.5em", borderRadius: "0.5em", width: "6em", textAlign: "center" }}>{ticket.status}</span></div></td>
      <td><div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><span style={{backgroundColor: "red", padding: "0.5em", borderRadius: "0.5em", color: "white", width: "4em", textAlign: "center"}}>{priority}</span></div></td>
      <td style={{textAlign: "center"}}>{createdTime.toLocaleString('en-us', options)}</td>
      <td style={{textAlign: "center"}}>{updatedTime.toLocaleString('en-us', options)}</td>
    </tr>
  )
}