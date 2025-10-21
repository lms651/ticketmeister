import { useLocation, useNavigate} from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCompletePurchase = () => {
    navigate("/purchase");
  }

  const { event, ticketNumber, totalPrice } = location.state || {};

  if (!event) {
    return <p>No event data found. Please go back and select an event.</p>;
  }

  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <p><strong>Event:</strong> {event.eventName}</p>
      <p><strong>Venue:</strong> {event.venueName}</p>
      <p><strong>Date:</strong> {event.eventDate}</p>
      <p><strong>Tickets:</strong> {ticketNumber}</p>
      <p><strong>Total:</strong> ${totalPrice}</p>

      <button className="button-with-icon" onClick={handleCompletePurchase}><FaCheckCircle size={20} /> Confirm Purchase</button>
    </section>
  );
}