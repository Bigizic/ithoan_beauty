/**
 *
 * Carousel
 *
 */

import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export const FadeSlider = (props) => {
  const {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    fade,
    autoplay,
    autoplaySpeed,
    children,
    nextArrow,
    prevArrow,
    arrows,
    swipeToSlide
  } = props;

  return (
    <Slider
      dots={dots}
      infinite={infinite}
      speed={speed}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      fade={fade}
      autoplay={autoplay}
      autoPlaySpeed={autoplaySpeed}
      nextArrow={nextArrow}
      prevArrow={prevArrow}
      arrows={arrows}
      swipeToSlide={swipeToSlide}
    >
      {children}
    </Slider>
  )
}


const CarouselSlider = props => {
  const {
    swipeable,
    draggable,
    showDots,
    infinite,
    autoPlay,
    keyBoardControl,
    autoPlaySpeed,
    ssr,
    responsive,
    children
  } = props;

  return (
    <Carousel
      swipeable={swipeable}
      draggable={draggable}
      showDots={showDots}
      infinite={infinite}
      autoPlay={autoPlay}
      keyBoardControl={keyBoardControl}
      autoPlaySpeed={autoPlaySpeed}
      ssr={ssr}
      responsive={responsive}
      customTransition='all 1s'
      transitionDuration={500}
      containerClass='carousel-container'
      dotListClass='carousel-dot-list-style'
      itemClass='carousel-slider-item'
    >
      {children}
    </Carousel>
  );
};

CarouselSlider.defaultProps = {
  swipeable: false,
  draggable: false,
  showDots: false,
  infinite: true,
  autoPlay: false,
  keyBoardControl: true,
  ssr: false,
  autoPlaySpeed: 2000
};

export default CarouselSlider;
