import logo from "../images/presenter.jpg"

export default function Header() {
    return (
        <header>
            <img className="logo" src={ logo } alt="Presenter" />
            <span className="title">TicketMeister</span>
        </header>
    )
}