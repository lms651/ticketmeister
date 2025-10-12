import LandingCarousel from "./LandingCarousel";
import Button from "./Button";
import Register from "./Register";

export default function LandingPage() {

    return (
        <main>
            <h2>Check out the latest events!</h2>
            <LandingCarousel />
            <Button text="Join now to Book!" />
            <Register />
        </main>
    )
}