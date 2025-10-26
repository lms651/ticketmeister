import React from "react";
import { useNavigate } from "react-router-dom"
import { FaShoppingCart } from 'react-icons/fa'

export default function EventDetails(props) {

    const [ticketNumber, setTicketNumber] = React.useState(1);
    const navigate = useNavigate();

    //resets ticket to 1 if venue changes
    React.useEffect(() => {
        setTicketNumber(1);
        }, [props.venue]);

    const handleTicketAmountChange = (event) => {
        const value = Number(event.target.value);
        setTicketNumber(value);
    }

    const totalPrice = ticketNumber * (props.venue.ticketPrice || 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/checkout", {
            state: {
            event: props.venue,
            ticketNumber,
            totalPrice,
            }
        })
    }

    return (
        <div className="event-container">

          <section className="event-details">
            <h1>Event Details</h1>
            <table className="event-table">
              <tbody>
                <tr>
                  <th>Event Name</th>
                  <td>{props.venue.eventName}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{props.venue.eventDescription}</td>
                </tr>
                <tr>
                  <th>Venue</th>
                  <td>{props.venue.venueName}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{props.venue.eventDate}</td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>{props.venue.eventTime}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>${props.venue.ticketPrice} per person</td>
                </tr>
              </tbody>
            </table>
          </section>
              <section className="landing-cart">
              <h1>Buy Tickets Now!</h1>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="ticketNumber">Number of Tickets:</label>
                      <input id="purchase-ticket" type="number" min="1" max="20" step="1" name="ticketNumber" value={ticketNumber} onChange={handleTicketAmountChange}/>
                      <p>Total Price: ${totalPrice} </p>
                      <button className="button-with-icon" type="submit"> <FaShoppingCart size={20} /> Checkout</button>
                  </form>
              </section>
        </div>
    )
}
