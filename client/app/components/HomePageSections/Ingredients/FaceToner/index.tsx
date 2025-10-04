import React from "react";
import { Card, CardContent } from "./card";

export const FaceTonerFrame = () => {
  const ingredients = [
    {
      name: "Water",
      description: "Pure water base that refreshes and hydrates the skin.",
      position: "top-[264px] left-[107px]",
      arrow: {
        src: "/images/arrow-5.svg",
        position: "top-[317px] left-[363px]",
        size: "w-[100px] h-[61px]",
      },
    },
    {
      name: "Denatured Ethanol",
      description: "Helps cleanse and tighten pores for a refreshed feel.",
      position: "top-52 left-[676px]",
      arrow: {
        src: "/images/arrow-6.svg",
        position: "top-[275px] left-[562px]",
        size: "w-[127px] h-[73px]",
      },
    },
    {
      name: "Strawberry Extracts",
      description:
        "Rich in antioxidants and vitamins to brighten and revitalize.",
      position: "top-[406px] left-[107px]",
      arrow: {
        src: "/images/arrow-4.svg",
        position: "top-[464px] left-[315px]",
        size: "w-[151px] h-[84px]",
      },
    },
    {
      name: "Benzalkonium Chloride",
      description:
        "Provides gentle antimicrobial protection to keep skin clear.",
      position: "top-[393px] left-[676px]",
      arrow: {
        src: "/images/arrow-3.svg",
        position: "top-[475px] left-[550px]",
        size: "w-[151px] h-[84px]",
      },
    },
  ];

  return (
    <div className="bg-primaryy face-toner">
      <div className="ingredients_details">
        <div className="batch">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] tracking-[0] leading-[30px] whitespace-nowrap">
            Batch No: HF001
          </h2>
        </div>
        <img
          className=""
          alt="Rectangle"
          src="/upload/images/ingredients/face_toner.png"
        />
        <div className="items-center gap-2 flex flex-col relative justify-center usage">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-center tracking-[0] leading-9">
            USAGE
          </h2>
          <h3 className="[font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-center tracking-[0] leading-[15px]">
            Apply a little drops of the hydrating face toner on a piece of cotton wool, apply on the face and neck to cleanse gently.
          </h3>
        </div>
      </div>
      <div className="ingredients_and_arrows">
        {ingredients.map((ingredient, index) => {
          if ((index + 1) % 2 === 0) {
            return (
              <div key={index} className={`ingredient_display ${(index + 1) % 2 === 0 ? 'ingredient_display_right' : ''}`}>
                <p data-aos="fade-right" data-aos-once="false" className="ingredient-name text-other">{ingredient.name}</p>
                <p data-aos="fade-right" data-aos-once="false" className="ingredient-desc">{ingredient.description}</p>
                <img
                  className="ingredient-arrow"
                  src={ingredient.arrow.src}
                >
                </img>
              </div>
            )
          } else {
            return (
              <div key={index} className={`ingredient_display ${(index + 1) % 2 === 0 ? 'ingredient_display_right' : ''}`}>
                <p data-aos="fade-left" data-aos-once="false" className="ingredient-name text-other">{ingredient.name}</p>
                <p data-aos="fade-left" data-aos-once="false" className="ingredient-desc">{ingredient.description}</p>
                <img
                  className="ingredient-arrow"
                  src={ingredient.arrow.src}
                >
                </img>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};
