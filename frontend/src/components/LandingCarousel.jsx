import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import pixel from "../images/pixel.jpg"
import carnaval from "../images/carnaval2.jpg"

export default function LandingCarousel(props) {

  const events = [
    { src: pixel, title: "Pixel Party", description: "Choose any 8-bit character!", venue: "7th Wave", date: "Dec 10", time: "7PM", price: 30 },
    { src: carnaval, title: "Winter Carnaval", description: "Come meet Bonhomme!", venue: "Quebec City", date: "Dec 20", time: "6PM", price: 50 }
  ]

  return (
    <Carousel
      key={props.frozen ? `frozen-${props.frozenSlide}` : "unfrozen"} // forces re-render on freeze
      autoPlay={!props.frozen} // stops autoplay when frozen
      infiniteLoop={!props.frozen} // stop infinite loop when frozen
      showThumbs={false}
      showStatus={false}
      interval={3000}
      selectedItem={props.frozenSlide ?? 0} // freeze on selected slide
    >
      {events.map((event, index) => (
        <div key={index} className="carousel-item">
          <img src={event.src} alt={event.title} />
          <p className="legend">{event.description}</p>
          
          {props.loggedIn && (
            <button
              className="book-btn"
              onClick={() => props.clickedBookNow(event, index)}
            >
              Book Now
            </button>
          )}
        </div>
      ))}
    </Carousel>
  )
}