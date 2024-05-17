import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Ticket, getPriorityName } from '../types/Ticket';

function TicketDetailsPage() {

  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);

  useEffect(() => {
    async function fetchTicket() {
      try {

        const response = await fetch(`/api/tickets/${id}`);

        if (response.ok) {
          const data: Ticket = await response.json();
          setTicket(data);
        } else {
          console.error("Error fetching tickets.");
        }

      } catch (err) {
        console.error("Error fetching tickets: ", err);
      }
    }
    fetchTicket();
  }, []);

  if (!ticket) return null;

  const createdTime = new Date(ticket.createdTime);
  const updatedTime = new Date(ticket.updatedTime);
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit', 
    year: 'numeric'
  };

  const priority = getPriorityName(ticket.priority) || "N/A";

  return (
    <>
      <Navbar />
      <div style={{padding: "1em", display: "flex" , justifyContent: "center", alignItems: "center"}}>

        <div style={{backgroundColor: "#00000010", padding: "2em", borderRadius: "1em", width: "75%"}}>
          <h2 style={{marginTop: 0, textAlign: "center"}}>{ticket.title}</h2>

          <hr />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Ticket ID: {ticket.ticketID}</h3>
              <span style={{ marginLeft: "1em" }}>by {ticket.firstName} {ticket.lastName}</span>
            </div>

            <div>
              <span style={{ marginLeft: "1em", backgroundColor: "#BAC550", padding: "0.5em", borderRadius: "0.5em" }}>{ticket.status}</span>
              <span style={{ marginLeft: "1em", backgroundColor: "red", padding: "0.5em", borderRadius: "0.5em", color: "white" }}>{priority}</span>
            </div>
            
          </div>

          <p>{ticket.description}</p>

          <div style={{ fontWeight: "bold", marginTop: "4em" }}>
            <span>Created: {createdTime.toLocaleString('en-us', options)}</span>
            <span style={{ marginLeft: "1em" }}>Last updated: {updatedTime.toLocaleString('en-us', options)}</span>
          </div>
        </div>
        

      </div>
    </>
  )
}

export default TicketDetailsPage;