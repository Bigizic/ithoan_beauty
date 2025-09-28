import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GsapEffect = ({ children }) => {
    const productRef = useRef(null);

    useEffect(() => {
      if (!productRef.current) return;

      gsap.fromTo(
        productRef.current,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power20.out",
          scrollTrigger: {
            trigger: productRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, []);

    return <div ref={productRef}>{children}</div>;
};

export default GsapEffect;
