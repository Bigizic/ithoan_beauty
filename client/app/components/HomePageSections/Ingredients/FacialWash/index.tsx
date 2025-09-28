import React from "react";
import { Card, CardContent } from "./card";

export const Frame = () => {
  const ingredients = [
    {
      name: "water",
      description:
        "Refreshing base that helps dissolve impurities and deliver hydration.",
      position: "top-48 left-[157px]",
    },
    {
      name: "Fragrance",
      description:
        "Adds a refreshing scent for an uplifting cleansing experience.",
      position: "top-[342px] left-[143px]",
    },
    {
      name: "Niacinamide",
      description:
        "Brightens skin tone, reduces dullness, and supports a healthy barrier.",
      position: "top-[442px] left-[103px]",
    },
    {
      name: "Propylene glycole",
      description: "Boosts moisture retention and enhances smoothness.",
      position: "top-[255px] left-[682px]",
    },
    {
      name: "Potassium hydroxide",
      description: "Helps balance pH and creates the gentle cleansing effect.",
      position: "top-[416px] left-[682px]",
    },
  ];

  const arrows = [
    {
      src: "/images/arrow-5.svg",
      position: "top-[257px] left-[409px]",
      size: "w-[100px] h-[61px]",
    },
    {
      src: "/images/arrow-6.svg",
      position: "top-[316px] left-[581px]",
      size: "w-[127px] h-[73px]",
    },
    {
      src: "/imges/arrow-7.svg",
      position: "top-[406px] left-[369px]",
      size: "w-[151px] h-[84px]",
    },
    {
      src: "/images/arrow-7.svg",
      position: "top-[505px] left-[318px]",
      size: "w-[151px] h-[84px]",
    },
    {
      src: "/images/arrow-3.svg",
      position: "top-[486px] left-[566px]",
      size: "w-[151px] h-[84px]",
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

      <header className="absolute top-20 left-[calc(50.00%_-_80px)] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
        Batch No: HF001
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
        className="absolute top-[calc(50.00%_-_248px)] left-[calc(50.00%_-_254px)] w-[510px] h-[496px] object-cover"
        alt="Rectangle"
        src="/rectangle-4.png"
      />
    </main>
  );
};
