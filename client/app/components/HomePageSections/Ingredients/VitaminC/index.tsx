import React from "react";
import { Card, CardContent } from "./card";

export const Frame = () => {
  const ingredients = [
    {
      name: "Propylene Glycol",
      description: "Enhances ingredient penetration and boosts skin softness.",
      position: "top-[250px] left-[670px]",
    },
    {
      name: "Xanthan Gum",
      description:
        "Provides a silky texture and helps stabilizes the serum properly",
      position: "top-[442px] left-[709px]",
    },
    {
      name: "Glycerin",
      description:
        "A natural humectant that draws moisture into the skin for lasting hydration",
      position: "top-[425px] left-[73px]",
    },
    {
      name: "Water",
      description:
        "Acts as a hydrating base, helping other ingredients absorb smoothly",
      position: "top-[292px] left-[85px]",
    },
  ];

  const arrows = [
    {
      src: "/images/arrow-5.svg",
      position: "top-[353px] left-[337px]",
      size: "w-[100px] h-[61px]",
    },
    {
      src: "/images/arrow-3.svg",
      position: "top-[513px] left-[568px]",
      size: "w-[151px] h-[84px]",
    },
    {
      src: "/images/arrow-4.svg",
      position: "top-[490px] left-[321px]",
      size: "w-[151px] h-[84px]",
    },
    {
      src: "/images/arrow-6.svg",
      position: "top-[319px] left-[554px]",
      size: "w-[127px] h-[73px]",
    },
  ];

  return (
    <main className="bg-white w-full min-w-[1057px] min-h-[768px] relative">
      {ingredients.map((ingredient, index) => (
        <Card
          key={index}
          className={`items-start gap-[3px] flex flex-col w-[275px] absolute ${ingredient.position} bg-transparent border-none shadow-none`}
        >
          <CardContent className="p-0">
            <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px]">
              {ingredient.name}
            </h3>
            <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-[10px] tracking-[0] leading-[15px]">
              {ingredient.description}
            </p>
          </CardContent>
        </Card>
      ))}

      <header className="absolute top-[91px] left-[calc(50.00%_-_82px)] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
        Batch No: VS001
      </header>

      <section className="items-center gap-2 top-[648px] left-[calc(50.00%_-_138px)] flex flex-col w-[275px] absolute">
        <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-2xl text-center tracking-[0] leading-9">
          USAGE
        </h2>
        <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-[10px] text-center tracking-[0] leading-[15px]">
          To be used after a facial cleansing, apply to the face and gently
          massage till it absorbs.
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
        className="absolute top-[113px] left-[calc(50.00%_-_300px)] w-[600px] h-[589px] object-cover"
        alt="Rectangle"
        src="/rectangle-4.png"
      />
    </main>
  );
};
