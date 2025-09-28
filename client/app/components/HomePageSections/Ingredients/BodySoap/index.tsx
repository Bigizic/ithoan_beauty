import React from "react";

export const Frame = () => {
  const ingredients = [
    {
      title: "Distilled Water",
      description: "Purified base that gently cleanses without harshness.",
      position: "top-[218px] left-[63px]",
    },
    {
      title: "Grape Seed Oil",
      description: "Enhances ingredient penetration and boosts skin softness.",
      position: "top-[244px] left-[717px]",
    },
    {
      title: "Cinnamon Powder",
      description:
        "Natural antibacterial that helps purify and refresh the skin.",
      position: "top-[412px] left-[63px]",
    },
    {
      title: "Honey",
      description: "Deeply moisturizing and soothing, supports a healthy glow.",
      position: "top-[392px] left-[719px]",
    },
  ];

  const arrows = [
    {
      src: "/images/arrow-5.svg",
      position: "top-[281px] left-[318px]",
      size: "w-[100px] h-[61px]",
    },
    {
      src: "/images/arrow-6.svg",
      position: "top-[317px] left-[619px]",
      size: "w-[127px] h-[73px]",
    },
    {
      src: "/images/arrow-4.svg",
      position: "top-[464px] left-[292px]",
      size: "w-[151px] h-[84px]",
    },
    {
      src: "/images/arrow-3.svg",
      position: "top-[460px] left-[614px]",
      size: "w-[151px] h-[84px]",
    },
  ];

  return (
    <main className="bg-white w-full min-w-[1057px] min-h-[768px] relative">
      {ingredients.map((ingredient, index) => (
        <section
          key={index}
          className={`items-start gap-[3px] flex flex-col w-[275px] absolute ${ingredient.position}`}
        >
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px]">
            {ingredient.title}
          </h2>
          <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-[10px] tracking-[0] leading-[15px]">
            {ingredient.description}
          </p>
        </section>
      ))}

      <header className="absolute top-20 left-[calc(50.00%_-_80px)] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
        Batch No: FS001
      </header>

      <section className="items-center gap-2 top-[648px] left-[calc(50.00%_-_138px)] flex flex-col w-[275px] absolute">
        <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-2xl text-center tracking-[0] leading-9">
          USAGE
        </h2>
        <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-[10px] text-center tracking-[0] leading-[15px]">
          Gently press the pump, use the face brush to wash your face while
          using a circular motion, rinse <br />
          with clean water.
        </p>
      </section>

      {arrows.map((arrow, index) => (
        <img
          key={index}
          className={`absolute ${arrow.position} ${arrow.size}`}
          alt="Arrow"
          src={arrow.src}
        />
      ))}

      <img
        className="absolute top-[calc(50.00%_-_194px)] left-[calc(50.00%_-_200px)] w-[400px] h-[389px] object-cover"
        alt="Rectangle"
        src="/rectangle-4.png"
      />
    </main>
  );
};
