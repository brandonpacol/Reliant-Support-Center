import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket } from '../types/Ticket';

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

  return (
    <>
      <h1>Ticket Details</h1>
      <h2>{ticket.title}</h2>
      <span>Ticket ID: {ticket.ticketID}</span>
      <span>Created by: {ticket.firstName} {ticket.lastName}</span>
      <span>Created on: {ticket.createdTime}</span>
      <span>{ticket.status}</span>
      <span>{ticket.priority}</span>
      <span>Last updated: {ticket.updatedTime}</span>

      <p>{ticket.description}</p>
    </>
  )
}

export default TicketDetailsPage;