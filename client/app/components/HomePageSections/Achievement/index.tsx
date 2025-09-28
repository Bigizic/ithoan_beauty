'use client'

import React, { useEffect, useRef, useState } from 'react'

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

const Counter = ({ end, duration = 2000, suffix = '' }: CounterProps) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated) {
          let start = 0
          const stepTime = Math.abs(Math.floor(duration / end))
          const timer = setInterval(() => {
            start += 1
            setCount(start)
            if (start === end) {
              clearInterval(timer)
              setHasAnimated(true) // mark as finished so it won’t run again
            }
          }, stepTime)
        }
      },
      { threshold: 0.5 } // trigger when 50% of element is visible
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [end, duration, hasAnimated])

  return <span className='heading-inherit-text' ref={ref}>{count}{suffix}</span>
}

const Achievement = () => {
  return (
    <div className="font-poppins flex flex-col text-[12px] md:text-[15px] lg:text-xl pd-default gap-[2em] mt-[2em]">
      <div className="flex flex-col items-center gap-0 lg:gap-[.5em] heading-text">
        <div className='font-spectral flex flex-row items-center heading-inherit-text'>
          <span data-aos="fade-right" data-aos-once="true" className='heading-inherit-text'>
            Luxury Skin&nbsp;
          </span>

          <span className='heading-inherit-text'>Care&nbsp;</span>
          <span data-aos="fade-left" data-aos-once="true" className='heading-inherit-text'>Essential Products</span>
        </div>

        <div data-aos="fade-up" className='text-center subHead-text' data-aos-once="false">
          <span className='heading-inherit-text'>Dedicated to Give Radiant and Youthful Glow.</span>
        </div>
      </div>

      <div className="flex flex-row items-center text-center justify-around gap-[2em]">
        <div className='flex flex-col'>
          <span className='font-spectral text-xl md:text-3xl lg:text-4xl font-extrabold' data-aos="zoom-in" data-aos-once="false" data-aos-delay="200">
            <Counter end={1000} suffix="+" />
          </span>
          <span className='heading-inherit-text'>Happy Customers</span>
        </div>

        <div className='flex flex-col'>
          <span className='font-spectral text-xl md:text-3xl lg:text-4xl font-extrabold' data-aos="zoom-in" data-aos-once="false" data-aos-delay="400">
            <Counter end={new Date().getFullYear() - 2019} suffix="+" />
          </span>
          <span className='heading-inherit-text'>Years of Radiance</span>
        </div>

        <div className='flex flex-col'>
          <span className='font-spectral text-xl md:text-3xl lg:text-4xl font-extrabold' data-aos="zoom-in" data-aos-once="false" data-aos-delay="600">
            <Counter end={100} suffix="%" />
          </span>
          <span className='heading-inherit-text'>True Radiance</span>
        </div>

        <div className='flex flex-col'>
          <span className='font-spectral text-xl md:text-3xl lg:text-4xl font-extrabold' data-aos="zoom-in" data-aos-once="false" data-aos-delay="800">
            <Counter end={15} suffix="+" />
          </span>
          <span className='heading-inherit-text'>Countries Reached</span>
        </div>
      </div>
    </div>
  )
}

export default Achievement
