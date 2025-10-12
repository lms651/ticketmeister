import LandingCarousel from "./LandingCarousel";
import React from "react";
import Button from "./Button";
import EventDetails from "./EventDetails";

export default function LandingPage() {

    const [loggedIn, setLoggedIn] = React.useState(true)
    const [bookNow, setBookNow] = React. useState(false)
    const [activeSlide, setActiveSlide] = React.useState(null)


    return (
        <main>
            <h2>Check out the latest events!</h2>
            {/* Carousel */}
            <LandingCarousel
                loggedIn={loggedIn}
                clickedBookNow={(event, index) => {
                    setBookNow(true);              // show EventDetails
                    setActiveSlide({ ...event, index }); // save selected event
                }}
                frozen={bookNow}                  // freeze carousel when booking
                frozenSlide={activeSlide?.index}  // which slide to freeze
            />

            {/* Join prompt if not logged in */}
            {!loggedIn && <Button text="Join now to Book!" />}            
            
            {/* Event details for the selected slide */}
            {bookNow && activeSlide && (
                <EventDetails event={activeSlide} />
            )}
        </main>
    )
}