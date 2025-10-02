'use client'

import React, { useRef, ReactNode } from "react";

interface RowCarouselProps {
  children: ReactNode;
  buttonClassName?: string;
  buttonClassLeftName?: string;
  buttonClassRightName?: string;
  leftArrow?: boolean;
  rightArrow?: boolean;
  className?: string;
  secClassName?: string;
}

const RowCarousel: React.FC<RowCarouselProps> = ({ 
  children, 
  buttonClassName = "", 
  buttonClassLeftName = "", 
  buttonClassRightName = "", 
  leftArrow,
  rightArrow,
  className,
  secClassName
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={className ? className : "relative w-full overflow-hidden flex flex-row"}>
      {/* left button */}
      <div
        onClick={scrollLeft}
        className={`
          row-carousel-left
          absolute top-1/2 -translate-y-1/2 
          bg-white text-black rounded-full cursor-pointer 
          p-4 w-10 h-10 justify-center items-center 
          hidden sm:flex left-0
          ${buttonClassName} ${buttonClassLeftName}
        `}
      >
        {leftArrow ? <span className="text-xl font-light">&larr;</span> : <span className="text-xl font-light">&lt;</span>}
      </div>

      {/* scrollable content */}
      <div
        ref={scrollRef}
        className={secClassName ? secClassName : "flex gap-8 overflow-x-auto scroll-smooth whitespace-nowrap sm:px-0 no-scrollbar"}
      >
        {children}
      </div>

      {/* right button */}
      <div
        onClick={scrollRight}
        className={`
          row-carousel-right
          absolute top-1/2 -translate-y-1/2 right-0
          bg-white text-black rounded-full cursor-pointer 
          p-4 w-10 h-10 justify-center items-center 
          hidden sm:flex
          ${buttonClassName} ${buttonClassRightName}
        `}
      >
        {rightArrow ? <span className="text-xl font-light">&rarr;</span> : <span className="text-xl font-light">&gt;</span>}
      </div>
    </div>
  );
};

export default RowCarousel;
