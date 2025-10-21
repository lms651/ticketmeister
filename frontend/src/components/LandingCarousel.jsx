import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import pixel from "../images/pixel.jpg"
import carnaval from "../images/carnaval2.jpg"

export default function LandingCarousel(props) {

  // Later fetch from MongoDB
  const venues = [
    { 
      src: pixel, 
      eventName: "Pixel Party", 
      eventDescription: "Choose any 8-bit character!", 
      venueName: "7th Wave", 
      eventDate: "Dec 10", 
      eventTime: "7PM", 
      ticketPrice: 30 
    },
    { 
      src: carnaval, 
      eventName: "Winter Carnaval", 
      eventDescription: "Come meet Bonhomme!", 
      venueName: "Quebec City", 
      eventDate: "Dec 20", 
      eventTime: "6PM", 
      ticketPrice: 50 
    }
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
      {venues.map((venue, index) => (
        <div key={index} className="carousel-item">
          <img src={venue.src} alt={venue.eventName} />
          <p className="legend">{venue.eventDescription}</p>
          
          {props.loggedIn && (
            <button
              className="book-btn"
              onClick={() => props.clickedBookNow(venue, index)}
            >
              Book Now
            </button>
          )}
        </div>
      ))}
    </Carousel>
  )
}