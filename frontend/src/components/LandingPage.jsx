import LandingCarousel from "./LandingCarousel";
import React from "react";
import Button from "./Button";
// import EventDetails from "./EventDetails";

export default function LandingPage() {

    const [loggedIn, setLoggedIn] = React.useState(false)

    return (
        <main>
            <h2>Check out the latest events!</h2>
            <LandingCarousel loggedIn = { loggedIn }/>
            <Button text="Join now to Book!" />
            {/* <EventDetails /> */}
        </main>
    )
}