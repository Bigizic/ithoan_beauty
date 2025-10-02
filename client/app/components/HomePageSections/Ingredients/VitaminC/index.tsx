import React from "react";
import { Card, CardContent } from "./card";

export const VitaminCFrame = () => {
  const ingredients = [
    {
      name: "Propylene Glycol",
      description: "Enhances ingredient penetration and boosts skin softness.",
      position: "top-[250px] left-[670px]",
      arrow: {
        src: "/images/arrow-5.svg",
        position: "top-[353px] left-[337px]",
        size: "w-[100px] h-[61px]",
      },
    },
    {
      name: "Xanthan Gum",
      description:
        "Provides a silky texture and helps stabilizes the serum properly",
      position: "top-[442px] left-[709px]",
      arrow: {
        src: "/images/arrow-3.svg",
        position: "top-[513px] left-[568px]",
        size: "w-[151px] h-[84px]",
      },
    },
    {
      name: "Glycerin",
      description:
        "A natural humectant that draws moisture into the skin for lasting hydration",
      position: "top-[425px] left-[73px]",
      arrow: {
        src: "/images/arrow-4.svg",
        position: "top-[490px] left-[321px]",
        size: "w-[151px] h-[84px]",
      },
    },
    {
      name: "Water",
      description:
        "Acts as a hydrating base, helping other ingredients absorb smoothly",
      position: "top-[292px] left-[85px]",
      arrow: {
        src: "/images/arrow-6.svg",
        position: "top-[319px] left-[554px]",
        size: "w-[127px] h-[73px]",
      },
    },
  ];

  return (
    <div className="bg-primaryy vitamin-c">
      <div className="ingredients_details">
        <div className="batch">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] tracking-[0] leading-[30px] whitespace-nowrap">
            Batch No: VS001
          </h2>
        </div>
        <img
          className=""
          alt="Rectangle"
          src="/upload/images/ingredients/vitamin_c.png"
        />
        <div className="items-center gap-2 flex flex-col relative justify-center usage">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-center tracking-[0] leading-9">
            USAGE
          </h2>
          <h3 className="[font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-center tracking-[0] leading-[15px]">
            To be used after a facial cleansing, apply to the face and gently
            massage till it absorbs.
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
