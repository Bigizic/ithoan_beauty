import React from "react";
import Marquee from "react-fast-marquee";

interface MarqueeProps {
  text?: any;
  type?: "imageAlone" | "image" | "text" | "new";
  onHover?: boolean;
  times?: number;
  image?: string;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  duration?: number;
  autoFill?: boolean;
  speed?: number;
  loop?: number;
  gradient: boolean;
  gradientColor: string;
  gradientWidth: number | string;
  className: string
}

const HomeMarquee: React.FC<MarqueeProps> = ({
  text,
  type = "text",
  onHover = false,
  times,
  image,
  direction = "left",
  pauseOnHover = true,
  duration = 50,
  autoFill = false,
  speed = 50,
  loop = 0,
  gradient = false,
  gradientColor = "white",
  gradientWidth = 200,
  className = "",
}) => {
  if (type === 'new') {
    return (
      <Marquee
        autoFill={autoFill}
        speed={speed}
        loop={loop}
        gradient={gradient}
        gradientColor={gradientColor}
        gradientWidth={gradientWidth}
        direction={direction}
        pauseOnHover={pauseOnHover}
        className={className}
      >
        {text}
      </Marquee>
    )
  } else if (type === "imageAlone") {
    return (
      <div className="w-full overflow-hidden whitespace-nowrap flex">
        <div
          className={`inline-flex items-center gap-16 w-max animate-slide ${onHover ? "hover:[animation-play-state:paused]" : ""
            }`}
        >
          {[...Array(times)].map((_, i) => (
            <div key={`a-${i}`}>
              {image ? (
                <img src={image} alt="marquee" className="w-[100px] h-[85px]" />
              ) : (
                <div className="w-[100px] h-[85px] bg-gray-300" />
              )}
            </div>
          ))}
          {[...Array(times)].map((_, i) => (
            <div key={`b-${i}`}>
              {image ? (
                <img src={image} alt="marquee" className="w-[100px] h-[85px]" />
              ) : (
                <div className="w-[100px] h-[85px] bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } else if (type === "image") {
    return (
      <div className="w-full overflow-hidden whitespace-nowrap flex">
        <div
          className={`inline-flex items-center gap-16 w-full py-2 animate-slide ${onHover ? "hover:[animation-play-state:paused]" : ""
            }`}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 uppercase text-2xl tracking-wider select-none"
            >
              {image ? (
                <img src={image} alt="marquee" className="w-[100px] h-[85px]" />
              ) : (
                <div className="w-[100px] h-[85px] bg-gray-300" />
              )}
              <p>{text ?? "Restoring your beauty confidence.."}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Marquee
        autoFill={autoFill}
        speed={speed}
        loop={loop}
        gradient={gradient}
        gradientColor={gradientColor}
        gradientWidth={gradientWidth}
        direction={direction}
        pauseOnHover={pauseOnHover}
        className={className}
      >
        <div className="flex items-center gap-16 w-max bg-black py-[8px]">
          {times
            ? [...Array(times)].map((_, i) => (
              <div
                key={`a-${i}`}
                className="inline-block text-white font-semibold text-[15px] md:text-[15px] sm:text-[12px] animate-marquee"
              >
                {text}
              </div>
            ))
            : null}
          {times
            ? [...Array(times)].map((_, i) => (
              <div
                key={`b-${i}`}
                className="inline-block text-white font-semibold text-[15px] md:text-[15px] sm:text-[12px] animate-marquee"
              >
                {text}
              </div>
            ))
            : null}
        </div>
      </Marquee>
    );
  }
};

export default HomeMarquee;
