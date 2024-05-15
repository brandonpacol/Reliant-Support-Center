import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  async function handleNewTicket() {
    navigate('/submit-ticket');
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Reliant Support Center</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Tickets</h2>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <select id="status" name="status">
            <option value="">Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <select id="priority" name="priority">
            <option value="">Priority</option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>

          <button onClick={handleNewTicket}>+ New Ticket</button>
        </div>
      </div>

      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            return <TableRow ticket={ticket} />
          })}
        </tbody>
      </table>
    </>
  );
}

export default TicketsPage;

interface TableRowProps {
  ticket: Ticket
}

function TableRow({ticket}: TableRowProps) {

  const createdTime = new Date(ticket.createdTime);
  const updatedTime = new Date(ticket.updatedTime);
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit', 
    year: 'numeric'
  };

  const priority = getPriorityName(ticket.priority) || "N/A";

  return (
    <tr>
      <td>{ticket.title}</td>
      <td>{ticket.status}</td>
      <td>{priority}</td>
      <td>{createdTime.toLocaleString('en-us', options)}</td>
      <td>{updatedTime.toLocaleString('en-us', options)}</td>
    </tr>
  )
}