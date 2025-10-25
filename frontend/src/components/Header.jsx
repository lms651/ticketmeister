import { Link } from "react-router-dom";
import logo from "../images/presenter.jpg"
import { FaUserCircle } from "react-icons/fa";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
import { useNavigate} from "react-router-dom"


export default function Header({ loggedIn, setLoggedIn }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setLoggedIn(false); 
        navigate("/");      
    }

    const handleEditProfile = () => {
        navigate("/update-profile");
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
        {loggedIn ? (
          <Menu as="div" className="relative-avatar-container">
            <MenuButton>
              <FaUserCircle size={35} className="avatar-icon" />
            </MenuButton>
            <MenuItems className="dropdown-menu">
              <MenuItem
                as="button"
                className={({ active }) =>
                  `menu-item ${active ? "active" : ""}`
                }
                onClick={handleEditProfile}
              >
                Edit Profile
              </MenuItem>

              <MenuItem
                as="button"
                className={({ active }) =>
                  `menu-item ${active ? "active" : ""}`
                }
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <div className="auth-buttons">
            <button onClick={handleLogin} className="auth-btn">
              Login
            </button>
          </div>
        )}
            </div>
        </header>
    )
}