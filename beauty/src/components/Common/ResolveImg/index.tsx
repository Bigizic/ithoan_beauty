import React from 'react'
import FadeSlider from '../FadeSlider'

type ResolveImageProps = {
  src: string | string[]
  className?: string
  alt?: string
  onClick?: () => void
}

export default function ResolveImage(props: ResolveImageProps) {
  const {
    src,
    className,
    alt = '',
    onClick,
    ...rest } = props
  {/*if (Array.isArray(src) && src.length > 1) {
    return (
      <FadeSlider
        dots={false}
        infinite={true}
        speed={800}
        slidesToShow={1}
        slidesToScroll={1}
        fade={true}
        autoplay={true}
        autoplaySpeed={2500}
        arrows={false}
        swipeToSlide={false}
      >
        {src.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={alt}
            className={className}
            onClick={onClick}
            {...rest}
          />
        ))}
      </FadeSlider>
    )
  }*/}

  // fallback: single image
  const imageUrl = Array.isArray(src) ? src[0] : src
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onClick={onClick}
      {...rest}
    />
  )
}

