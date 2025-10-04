import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css'

interface FadeSliderProps {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  fade?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  children?: React.ReactNode;
  nextArrow?: React.ReactElement;
  prevArrow?: React.ReactElement;
  arrows?: boolean;
  swipeToSlide?: boolean;
}

const FadeSlider: React.FC<FadeSliderProps> = (props) => {
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
    <div className="fade-sliderr">
      <Slider
        dots={dots}
        infinite={infinite}
        speed={speed}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        fade={fade}
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        nextArrow={nextArrow}
        prevArrow={prevArrow}
        arrows={arrows}
        swipeToSlide={swipeToSlide}
        touchThreshold={10}
      >
        {children}
      </Slider>
    </div>
  );
};

export default FadeSlider;