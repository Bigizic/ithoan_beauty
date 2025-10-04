import React from "react";
import { Card, CardContent } from "./card";

export const FacialWashFrame = () => {
  const ingredients = [
    {
      name: "Water",
      description:
        "Refreshing base that helps dissolve impurities and deliver hydration.",
      position: "top-48 left-[147px]",
      arrow: {
        src: "/images/arrow-5.svg",
        position: "top-[257px] left-[409px]",
        size: "w-[100px] h-[61px]",
      },
    },
    {
      name: "Fragrance",
      description:
        "Adds a refreshing scent for an uplifting cleansing experience.",
      position: "top-[342px] left-[143px]",
      arrow: {
        src: "/images/arrow-6.svg",
        position: "top-[316px] left-[581px]",
        size: "w-[127px] h-[73px]",
      },
    },
    {
      name: "Niacinamide",
      description:
        "Brightens skin tone, reduces dullness, and supports a healthy barrier.",
      position: "top-[442px] left-[103px]",
      arrow: {
        src: "/images/arrow-7.svg",
        position: "top-[406px] left-[369px]",
        size: "w-[151px] h-[84px]",
      },
    },
    {
      name: "Propylene glycole",
      description: "Boosts moisture retention and enhances smoothness.",
      position: "top-[255px] left-[682px]",
      arrow: {
        src: "/images/arrow-6.svg",
        position: "top-[505px] left-[318px]",
        size: "w-[151px] h-[84px]",
      },
    },
    /*{
      name: "Potassium hydroxide",
      description: "Helps balance pH and creates the gentle cleansing effect.",
      position: "top-[416px] left-[682px]",
      arrow: {
        src: "/images/arrow-5.svg",
        position: "top-[486px] left-[566px]",
        size: "w-[151px] h-[84px]",
      },
    },*/
  ];

  return (
    <div className="bg-primaryy facial-wash">
      <div className="ingredients_details">
        <div className="batch">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] tracking-[0] leading-[30px] whitespace-nowrap">
            Batch No: HF001
          </h2>
        </div>
        <img
          className=""
          alt="Rectangle"
          src="/upload/images/ingredients/facial_wash.png"
        />
        <div className="items-center gap-2 flex flex-col relative justify-center usage">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-center tracking-[0] leading-9">
            USAGE
          </h2>
          <h3 className="[font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-center tracking-[0] leading-[15px]">
            Gently press the pump, use the face brush to wash your face while
            using a circular motion, rinse with clean water.
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
