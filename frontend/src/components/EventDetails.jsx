export default function EventDetails(props) {
    return (
        <div className="event-container">
        <section className="event-details">
            <h1>Event Name:</h1>
            <p>{ props.eventName }</p>
            <h1>Description:</h1>
            <p>{ props.description }</p>
            <h1>Venue:</h1>
            <p>{ props.venue }</p>
            <h1>Date:</h1>
            <p>{ props.date }</p>
            <h1>Time:</h1>
            <p>{ props.venue }</p>
            <h1>Price:</h1>
            <p>{ props.price } per person</p>
        </section>

        <section className="landing-cart">
        <h1>Buy Tickets Now!</h1>
                    <form>
                <label htmlFor="ticketNumber">Number of Tickets:</label>
                <input id="purchase-ticket" type="number" min="1" max="20" step="1" name="ticketNumber"/>
                <p>Total Price: {props.price} </p>
                <button type="submit">Proceed to Checkout</button>
            </form>
        </section>
        </div>
    )
}