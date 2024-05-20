import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatusTag from "../components/StatusTag";
import PriorityTag from "../components/PriorityTag";
import { Priority, Ticket, Status } from "../types/Ticket";
import { getFormattedDateString } from "../helpers/utils";
import "./TicketsPage.css"

/** The Home Page displaying all Tickets. Users can filter tickets by Status and Priority here. */
function TicketsPage() {

  const navigate = useNavigate();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTickets() {
      try {

        let url = "/api/tickets";
        let queryParams = new URLSearchParams();
        if (selectedStatus !== "") {
          queryParams.set("status", selectedStatus);
        }
        if (selectedPriority !== "") {
          queryParams.set("priority", selectedPriority);
        }
        url += queryParams.size > 0 ? "?" + queryParams.toString() : "";

        const response = await fetch(url);

        if (response.ok) {
          const data: Ticket[] = await response.json();
          setTickets(data);
        } else {
          console.error("Error fetching tickets.");
          setError(true);
        }

      } catch (err) {
        console.error("Error fetching tickets: ", err);
        setError(true);
      }
    }
    fetchTickets();
  }, [selectedStatus, selectedPriority]);

  function handleNewTicket() {
    navigate('/submit-ticket');
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(event.target.value);
  }

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedPriority(event.target.value);
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div id="ticket-container">
          <div id="ticket-controls">
            <h2>Tickets</h2>

            <div id="controls-container">
              <select name="status" className="status-select" value={selectedStatus} onChange={handleStatusChange}>
                <option value="">All Status</option>
                <option value={Status.Open}>{Status.Open}</option>
                <option value={Status.InProgress}>{Status.InProgress}</option>
                <option value={Status.Resolved}>{Status.Resolved}</option>
              </select>

              <select name="priority" className="priority-select" value={selectedPriority} onChange={handlePriorityChange}>
                <option value="">All Priority</option>
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
              </select>

              <button id="ticket-btn" onClick={handleNewTicket}>+ New Ticket</button>
            </div>
          </div>

          <div id="table-container">
            <table id="ticket-table">
              <colgroup>
                <col />
              </colgroup>
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
            {tickets.length === 0 && <p style={{textAlign: "center"}}>No results to show</p>}
          </div>

          {error && <p className="error-msg">There was an error loading your tickets. Please refresh to try again.</p>}
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

  const createdTime = getFormattedDateString(ticket.createdTime);
  const updatedTime = getFormattedDateString(ticket.updatedTime);

  function handleRowClick() {
    if (ticket.ticketID) navigate(`/tickets/${ticket.ticketID}`);
  }

  return (
    <tr onClick={handleRowClick}>
      <td className="subject">{ticket.title}</td>
      <td><div className="tag-container"><StatusTag status={ticket.status}/></div></td>
      <td><div className="tag-container"><PriorityTag priority={ticket.priority}/></div></td>
      <td>{createdTime}</td>
      <td>{updatedTime}</td>
    </tr>
  )
}