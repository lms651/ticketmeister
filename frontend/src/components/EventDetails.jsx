import React from "react";

export default function EventDetails(props) {

    const [ticketNumber, setTicketNumber] = React.useState(1);

    const handleTicketAmountChange = (event) => {
        const value = Number(event.target.value);
        setTicketNumber(value);
    }
    

    const totalPrice = ticketNumber * props.event.price;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Purchasing ${ticketNumber} tickets for $${totalPrice}`);
    // navigate to cart
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