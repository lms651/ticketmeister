import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pixel from "../images/pixel.jpg"
import carnaval from "../images/carnaval2.jpg"

export default function LandingCarousel() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
    >
      <div>
        <img src={ pixel } alt="Pixel Party" />
        <p className="legend">Pixel Party at 7th Wave</p>
      </div>
      <div>
        <img src={ carnaval } alt="Winter Carnaval" />
        <p className="legend">Winter Carnaval in Quebec City!</p>
      </div>
    </Carousel>
  )
}