'use client'

import React, { useEffect, useRef, ReactNode } from 'react'

interface ScrollTranslateProps {
  children: ReactNode
  multiplier?: number // how fast the scroll moves the element
  className?: string
  scrollClass?: string
}

const ScrollTranslate: React.FC<ScrollTranslateProps> = ({ children, multiplier = 0.2, className, scrollClass }) => {
  const elRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elRef.current) return
      const scrollY = window.scrollY
      const offset = scrollY * multiplier
      elRef.current.style.transform = `translateY(-${offset}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [multiplier])

  return (
    <div
      ref={elRef}
      className={`transition-transform duration-200 ease-out will-change-transform ${className  || ''} ${scrollClass || ''}`}
    >
      {children}
    </div>
  )
}

export default ScrollTranslate