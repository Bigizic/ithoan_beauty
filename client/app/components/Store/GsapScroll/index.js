import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    gsap.to(container, {
      y: () => -(container.scrollHeight - window.innerHeight),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  );
};

export default GsapScroll;
/*
gsap.to("video", {
  scrollTrigger: {
    trigger: "video",
    start: "top top",
    end: "bottom top",
    scrub: true
  },
  y: "-100%", // Moves the video up as you scroll
});
*/
