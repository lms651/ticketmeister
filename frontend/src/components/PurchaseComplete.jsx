import Chat from "./Chat";
import { useLocation } from "react-router-dom";
import React from "react";

export default function PurchaseComplete() {
  const location = useLocation();
  const { event, userName } = location.state || {};

  if (!event) return <p>No event data found.</p>;

  const [guestName] = React.useState(() => `Guest${Math.floor(Math.random() * 1000)}`);

  return (
    <div className="purchase-complete">
      <h2>Thank you for your purchase!</h2>
      <p>We look forward to seeing you soon at the {event.eventName}! 🎟️</p>

      <section className="chat-section">
        <h2>Chat with Other Attendees</h2>
        <Chat eventId={event._id} userName= {guestName} />
      </section>
    </div>
  )
}
