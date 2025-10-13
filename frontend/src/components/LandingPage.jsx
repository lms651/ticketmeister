import LandingCarousel from "./LandingCarousel";
import React from "react";
import Button from "./Button";
import EventDetails from "./EventDetails";

export default function LandingPage() {

    const [loggedIn, setLoggedIn] = React.useState(true)
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [frozen, setFrozen] = React.useState(false);

    return (
        <main>
            <h2>Check out the latest events!</h2>
            {/* Carousel */}
            <LandingCarousel
                loggedIn={loggedIn}
                clickedBookNow={(event, index) => {
                    setSelectedEvent(event);
                    setSelectedIndex(index);
                    setFrozen(true); // freeze carousel immediately and show event details^^
                }}
                frozen={frozen}
                frozenSlide={selectedIndex}
            />

            {/* Join prompt if not logged in */}
            {!loggedIn && <Button text="Join now to Book!" />}            
            
            {/* Event details for the selected slide */}
            { selectedEvent && frozen && (
            <EventDetails event={selectedEvent} />
            )}
        </main>
    )
}