'use client'

import React, { useEffect, useRef, ReactNode } from 'react'

interface ScrollTranslateProps {
  children: ReactNode
  multiplier?: number
  className?: string
  scrollClass?: string
}

const ScrollTranslateOthers: React.FC<ScrollTranslateProps> = ({
  children,
  multiplier = 0.2,
  className,
  scrollClass
}) => {
  const elRef = useRef<HTMLDivElement | null>(null)
  const parentRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!elRef.current) return
    parentRef.current = elRef.current.parentElement as HTMLElement | null

    const handleScroll = () => {
      if (!elRef.current || !parentRef.current) return

      const parentRect = parentRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // only apply when parent is visible
      if (parentRect.top < windowHeight && parentRect.bottom > 0) {
        // how far scrolled inside parent
        const parentScrollProgress =
          (windowHeight - parentRect.top) / (windowHeight + parentRect.height)

        const offset = parentScrollProgress * multiplier * parentRect.height

        elRef.current.style.transform = `translateY(-${offset}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [multiplier])

  return (
    <div
      ref={elRef}
      className={`transition-transform duration-200 ease-out will-change-transform ${className || ''} ${scrollClass || ''}`}
    >
      {children}
    </div>
  )
}

export default ScrollTranslateOthers
