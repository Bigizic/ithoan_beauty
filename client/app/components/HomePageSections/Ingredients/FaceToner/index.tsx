import React from "react";
import { Card, CardContent } from "./card";

export const Frame = () => {
  const ingredients = [
    {
      title: "Water",
      description: "Pure water base that refreshes and hydrates the skin.",
      position: "top-[264px] left-[107px]",
    },
    {
      title: "Denatured Ethanol",
      description: "Helps cleanse and tighten pores for a refreshed feel.",
      position: "top-52 left-[676px]",
    },
    {
      title: "Strawberry Extracts",
      description:
        "Rich in antioxidants and vitamins to brighten and revitalize.",
      position: "top-[406px] left-[107px]",
    },
    {
      title: "Benzalkonium Chloride",
      description:
        "Provides gentle antimicrobial protection to keep skin clear.",
      position: "top-[393px] left-[676px]",
    },
  ];

  const arrows = [
    {
      src: "/images/arrow-5.svg",
      position: "top-[317px] left-[363px]",
      size: "w-[100px] h-[61px]",
    },
    {
      src: "/images/arrow-6.svg",
      position: "top-[275px] left-[562px]",
      size: "w-[127px] h-[73px]",
    },
    {
      src: "/images/arrow-4.svg",
      position: "top-[464px] left-[315px]",
      size: "w-[151px] h-[84px]",
    },
    {
      src: "/images/arrow-3.svg",
      position: "top-[475px] left-[550px]",
      size: "w-[151px] h-[84px]",
    },
  ];

  return (
    <main className="bg-white w-full min-w-[1057px] min-h-[768px] relative">
      <header className="absolute top-20 left-[calc(50.00%_-_80px)] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px] whitespace-nowrap">
        Batch No: HF001
      </header>

      {ingredients.map((ingredient, index) => (
        <Card
          key={index}
          className={`items-start gap-[3px] flex flex-col w-[275px] absolute ${ingredient.position} bg-transparent border-none shadow-none`}
        >
          <CardContent className="p-0">
            <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-xl tracking-[0] leading-[30px]">
              {ingredient.title}
            </h2>
            <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-[10px] tracking-[0] leading-[15px]">
              {ingredient.description}
            </p>
          </CardContent>
        </Card>
      ))}

      <section className="items-center gap-2 top-[648px] left-[calc(50.00%_-_138px)] flex flex-col w-[275px] absolute">
        <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-2xl text-center tracking-[0] leading-9">
          USAGE
        </h2>
        <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-[10px] text-center tracking-[0] leading-[15px]">
          Apply a little drops of the hydrating face toner on a piece of cotton
          wool, apply on the face and <br />
          neck to cleanse gently.
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
        className="absolute top-[calc(50.00%_-_213px)] left-[calc(50.00%_-_174px)] w-[322px] h-[426px] object-cover"
        alt="Rectangle"
        src="/rectangle-8.png"
      />
    </main>
  );
};
