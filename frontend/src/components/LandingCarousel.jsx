import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { getAllVenues } from "../api/venues"
import React from "react";

export default function LandingCarousel(props) {
  const [venues, setVenues] = React.useState([]);

  React.useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getAllVenues() 
        setVenues(data)
      } catch (err) {
        console.error("Error fetching venues:", err)
      }
    }
    fetchVenues()
  }, [])


  return (
    <Carousel
      key={props.frozen ? `frozen-${props.frozenSlide}` : "unfrozen"}
      autoPlay={!props.frozen} 
      infiniteLoop={!props.frozen} 
      showThumbs={false}
      showStatus={false}
      interval={3000}
      selectedItem={props.frozenSlide ?? 0}
    >
      {venues.map((venue, index) => (
        <div key={index} className="carousel-item">
          <img src={venue.imageSrc} alt={venue.eventName} />
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