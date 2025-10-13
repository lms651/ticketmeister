import React from "react";
import { useNavigate } from "react-router-dom";

export default function EventDetails(props) {

    const [ticketNumber, setTicketNumber] = React.useState(1);
    const navigate = useNavigate();

    //resets ticket to 1 if user changes events
    React.useEffect(() => {
        setTicketNumber(1);
        }, [props.event]);

    const handleTicketAmountChange = (event) => {
        const value = Number(event.target.value);
        setTicketNumber(value);
    }

    const totalPrice = ticketNumber * props.event.price;

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/checkout", {
            state: {
            event: props.event,
            ticketNumber,
            totalPrice,
            }
        })
    }

    return (
        <div className="event-container">
        <section className="event-details">
            <h1>Event Name:</h1>
            <p>{ props.event.title }</p>
            <h1>Description:</h1>
            <p>{ props.event.description }</p>
            <h1>Venue:</h1>
            <p>{ props.event.venue }</p>
            <h1>Date:</h1>
            <p>{ props.event.date }</p>
            <h1>Time:</h1>
            <p>{ props.event.venue }</p>
            <h1>Price:</h1>
            <p>{ props.event.price } per person</p>
        </section>

        <section className="landing-cart">
        <h1>Buy Tickets Now!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ticketNumber">Number of Tickets:</label>
                <input id="purchase-ticket" type="number" min="1" max="20" step="1" name="ticketNumber" value={ticketNumber} onChange={handleTicketAmountChange}/>
                <p>Total Price: ${totalPrice} </p>
                <button type="submit">Proceed to Checkout</button>
            </form>
        </section>
        </div>
    )
}