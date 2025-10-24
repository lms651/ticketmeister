import LandingCarousel from "./LandingCarousel"
import React from "react"
import Button from "./Button"
import EventDetails from "./EventDetails"
import { useNavigate} from "react-router-dom"


export default function LandingPage({ loggedIn }) {
    const navigate = useNavigate();

    // const [loggedIn, setLoggedIn] = React.useState(false)
    const [selectedVenue, setSelectedVenue] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [frozen, setFrozen] = React.useState(false);

    const handleJoinNow = () => {
        navigate("/register");
    }

    return (
        <main>
            <h2>Check out the latest events!</h2>
            {/* Carousel */}
            <LandingCarousel
                loggedIn={loggedIn}
                clickedBookNow={(event, index) => {
                    setSelectedVenue(event);
                    setSelectedIndex(index);
                    setFrozen(true); // freeze carousel immediately and show event details^^
                }}
                frozen={frozen}
                frozenSlide={selectedIndex}
            />

            {/* Join prompt if not logged in */}
            {!loggedIn && <Button text="Join now to Book!" onClick = {handleJoinNow} />}            
            
            {/* Event details for the selected slide */}
            { selectedVenue && frozen && (
            <EventDetails venue={selectedVenue} />
            )}
        </main>
    )
}