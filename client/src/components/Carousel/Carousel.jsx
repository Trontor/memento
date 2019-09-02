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
    return (
      <CarouselWrapper>
        <Slider {...settings}>
          <CarouselSlide>
            <img
              src="https://images.unsplash.com/photo-1534216801749-bb1db8970e54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
              alt="blah"
            />
            <Description>
              Store your memories for generations to come
            </Description>
          </CarouselSlide>
          <CarouselSlide>
            <img
              src="https://images.unsplash.com/flagged/photo-1564468780664-c91bb3af737e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
              alt="blah"
            />
            <Description>Lorem Ipsum lorem ipsum</Description>
          </CarouselSlide>
          <CarouselSlide>
            <img
              src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
              alt="blah"
            />
            <Description>Lorem Ipsum lorem ipsum</Description>
          </CarouselSlide>
        </Slider>
      </CarouselWrapper>
    );
  }
}
