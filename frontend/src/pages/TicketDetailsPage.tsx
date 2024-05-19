import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusTag from '../components/StatusTag';
import StatusTagEditable from '../components/StatusTagEditable';
import PriorityTag from '../components/PriorityTag';
import BackNavigation from '../components/BackNavigation';
import { Ticket } from '../types/Ticket';
import "./TicketDetailsPage.css";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  month: '2-digit',
  day: '2-digit', 
  year: 'numeric'
};

function TicketDetailsPage() {

  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      try {

        const response = await fetch(`/api/tickets/${id}`);

        if (response.ok) {
          const data = await response.json();
          const newTicket = data.ticket;
          const isAdmin = data.isAdmin;
          setTicket(newTicket);
          setIsAdmin(isAdmin);
        } else {
          console.error("Error fetching tickets.");
        }

      } catch (err) {
        console.error("Error fetching tickets: ", err);
      }
    }
    fetchTicket();
  }, []);

  async function updateTicket(status: string) {
    if (ticket) {
      const newStatus = status;
      const newTime = new Date(Date.now()).toISOString();
      const newTicket: Ticket = { ...ticket, status: newStatus, updatedTime: newTime };

      try {

        const result = await fetch(`/api/tickets/${ticket.ticketID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: newStatus
          })
        });

        if (result.ok) {
          console.log("Successfully updated ticket!");
          setTicket(newTicket);
        } else {
          console.error("Error updating ticket.");
        }

      } catch (err) {
        console.error("Error updating ticket: ", err);
      }
    }
  }

  const createdTime = ticket ? new Date(ticket.createdTime) : null;
  const updatedTime = ticket ? new Date(ticket.updatedTime) : null;

  return (
    <>
      <Navbar />

      <div className="page-container">

        <BackNavigation />

        {ticket && createdTime && updatedTime && <div className="form-container">

          <h2 id="ticket-title">{ticket.title}</h2>

          <hr />

          <div id="details-container">
            <div>
              <h3>Ticket ID: {ticket.ticketID}</h3>
              <span>by {ticket.firstName} {ticket.lastName}</span>
            </div>

            <div style={{display: "flex", gap: "1em"}}>
              {isAdmin ? <StatusTagEditable status={ticket.status} updateTicket={updateTicket} /> :
              <StatusTag style={{width: "unset"}} status={ticket.status} />}
              <PriorityTag style={{width: "unset"}} priority={ticket.priority} />
            </div>
            
          </div>

          <p>{ticket.description}</p>

          <div id="date-container">
            <span>Created: {createdTime.toLocaleString('en-us', dateFormatOptions)}</span>
            <span>Last updated: {updatedTime.toLocaleString('en-us', dateFormatOptions)}</span>
          </div>

        </div>}
        

      </div>
    </>
  )
}

export default TicketDetailsPage;