import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";



function Carosuel() {
    
  const navigate = useNavigate();
  return (
    <>
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100 carousel"
          src="https://wallpaperaccess.com/full/3086384.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <button
            type="button"
            className="btn-explore"
            onClick={() => navigate("/create")}
          >
            Explore
          </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100 carousel"
          src="https://images.squarespace-cdn.com/content/v1/55ce5a64e4b0a4f80bea2a21/1605659659464-QVTIOOTX1JMD73TZ8KIH/_99A6363f.jpg?format=2500w"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100 carousel"
          src="https://images.wallpaperscraft.com/image/single/bread_vegetables_meat_food_70203_1280x720.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel"
          src="https://wallpaperaccess.com/full/767252.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default Carosuel