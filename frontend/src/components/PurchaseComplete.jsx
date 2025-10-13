import Chat from "./Chat"

export default function PurchaseComplete() {
    
    return (
        <div className="purchase-complete">
            <h2>Thank you for your purchase!</h2>
            <p>We look forward to seeing you soon 🎟️</p>

            <section className="chat-section">
                <h2>Chat with Other Attendees</h2>
                <Chat />
            </section>
        </div>
    )
}