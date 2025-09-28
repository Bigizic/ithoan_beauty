import React, { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type FadeSliderProps = Settings & {
  children: React.ReactNode
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
    autoplaySpeed = 2000,
    children,
    nextArrow,
    prevArrow,
    arrows,
    swipeToSlide,
    beforeChange,
  } = props

  const sliderRef = useRef<Slider | null>(null)

  return (
    <Slider
      ref={sliderRef}
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
      beforeChange={beforeChange}
    >
      {children}
    </Slider>
  )
}

export default FadeSlider
