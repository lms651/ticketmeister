import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { createSignUp } from "../api/signups";

export default function Checkout({ userId }) { // pass userId from App or context
  const location = useLocation();
  const navigate = useNavigate();
  const { event, ticketNumber } = location.state || {};

  if (!event) {
    return <p>No event data found. Please go back and select an event.</p>;
  }

  const handleCompletePurchase = async () => {
    try {
      const signupData = {
        userId,          // must be provided from logged-in user
        venueId: event._id,
        ticketCount: ticketNumber,
      };

      const response = await createSignUp(signupData);
      console.log("Signup successful:", response);

      navigate("/purchase", {
        state: { event, userId },
      }); // go to confirmation page

    } catch (err) {
      console.error("Error creating signup:", err);
      alert("There was an error completing your purchase. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <p><strong>Event:</strong> {event.eventName}</p>
      <p><strong>Venue:</strong> {event.venueName}</p>
      <p><strong>Date:</strong> {event.eventDate}</p>
      <p><strong>Tickets:</strong> {ticketNumber}</p>

      <button
        className="button-with-icon"
        style={{ backgroundColor: 'green', color: 'white' }}
        onClick={handleCompletePurchase}
      >
        <FaCheckCircle size={20} /> Confirm Purchase
      </button>
      <button
        className="button-with-icon"
        onClick={handleCancel}
      >
        <FaTimesCircle size={20} /> Cancel
      </button>
    </section>
  );
}
