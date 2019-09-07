import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.scss";
import { CarouselWrapper, Description, CarouselSlide } from "./CarouselStyles";

export default class Carousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 3300,
      speed: 2000,
      arrows: true
      // prevArrow: <SamplePrevArrow/>
    };
    const imgSrc = [
      "https://images.unsplash.com/photo-1534216801749-bb1db8970e54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/flagged/photo-1564468780664-c91bb3af737e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
    ];

    return (
      <CarouselWrapper>
        <Slider {...settings}>
          {imgSrc.map(image => (
            <CarouselSlide>
              <img src={image} alt="blah"></img>
              <Description>Lorem Ipsum Lorem Ipsum</Description>
            </CarouselSlide>
          ))}
        </Slider>
      </CarouselWrapper>
    );
  }
}
