import { Link } from "react-router-dom";
import logo from "../images/presenter.jpg"
import { FaUserCircle } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { useNavigate} from "react-router-dom"


export default function Header({ loggedIn, setLoggedIn }) {
    const navigate = useNavigate();


    const handleLogout = () => {
        setLoggedIn(false); 
        navigate("/");      
    }

    return (
        <header>
            <div className="left-section">
                <Link to="/" className="logo-link">
                    <img className="logo" src={ logo } alt="Presenter" />
                    <span className="title">TicketMeister</span>
                </Link>
            </div>
            <div className="right-section">
      {loggedIn && (
        <Menu as="div" className="relative-avatar-container">
          <Menu.Button>
            <FaUserCircle size={35} className="avatar-icon" />
          </Menu.Button>

          <Menu.Items className="dropdown-menu">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={active ? "menu-item active" : "menu-item"}
                  onClick={() => console.log("Edit profile")}
                >
                  Edit Profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={active ? "menu-item active" : "menu-item"}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
            </div>
        </header>
    )
}