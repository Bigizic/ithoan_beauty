import React from "react";

interface MarqueeProps {
  text?: any;
  type?: "imageAlone" | "image" | "text";
  onHover?: boolean;
  times?: number;
  image?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  text,
  type = "text",
  onHover = false,
  times,
  image,
}) => {
  if (type === "imageAlone") {
    return (
      <div className="w-full overflow-hidden whitespace-nowrap flex">
        <div
          className={`inline-flex items-center gap-16 w-max animate-slide ${
            onHover ? "hover:[animation-play-state:paused]" : ""
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
          className={`inline-flex items-center gap-16 w-full py-2 animate-slide ${
            onHover ? "hover:[animation-play-state:paused]" : ""
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
      <div className="w-full overflow-hidden whitespace-nowrap flex py-2">
        <div
          className={`flex items-center gap-16 w-max ${
            times ? "animate-[slide_20s_linear_infinite]" : "animate-marquee"
          } ${onHover ? "hover:[animation-play-state:paused]" : ""}`}
        >
          {times
            ? [...Array(times)].map((_, i) => (
                <div
                  key={`a-${i}`}
                  className="inline-block text-black font-semibold text-[15px] md:text-[15px] sm:text-[12px] animate-marquee"
                >
                  {text}
                </div>
              ))
            : null}
          {times
            ? [...Array(times)].map((_, i) => (
                <div
                  key={`b-${i}`}
                  className="inline-block text-black font-semibold text-[15px] md:text-[15px] sm:text-[12px] animate-marquee"
                >
                  {text}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
};

export default Marquee;
