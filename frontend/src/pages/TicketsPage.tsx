import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatusTag from "../components/StatusTag";
import PriorityTag from "../components/PriorityTag";
import { Ticket } from "../types/Ticket";
import "./TicketsPage.css"

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

      <div className="page-container">
        <div id="ticket-container">
          <div id="ticket-controls">
            <h2>Tickets</h2>

            <div id="controls-container">
              <select name="status" className="status-select">
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>

              <select name="priority" className="priority-select">
                <option value="">All Priority</option>
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>

              <button id="ticket-btn" onClick={handleNewTicket}>+ New Ticket</button>
            </div>
          </div>

          <div id="table-container">
            <table id="ticket-table">
              <thead>
                <tr>
                  <th id="subject-heading">Subject</th>
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
          </div>
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

  function handleRowClick() {
    if (ticket.ticketID) navigate(`/tickets/${ticket.ticketID}`);
  }

  return (
    <tr onClick={handleRowClick}>
      <td className="subject">{ticket.title}</td>
      <td><div className="tag-container"><StatusTag status={ticket.status}/></div></td>
      <td><div className="tag-container"><PriorityTag priority={ticket.priority}/></div></td>
      <td>{createdTime.toLocaleString('en-us', options)}</td>
      <td>{updatedTime.toLocaleString('en-us', options)}</td>
    </tr>
  )
}