import { Link } from "react-router-dom";
import logo from "../images/presenter.jpg"

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo-link">
                <img className="logo" src={ logo } alt="Presenter" />
                <span className="title">TicketMeister</span>
            </Link>
        </header>
    )
}