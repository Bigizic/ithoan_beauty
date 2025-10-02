import React from "react";

export const BodySoapFrame = () => {
  const ingredients = [
    {
      name: "Distilled Water",
      description: "Purified base that gently cleanses without harshness.",
      position: "top-[218px] left-[63px]",
      arrow: {
        src: "/images/arrow-5.svg",
        position: "top-[281px] left-[318px]",
        size: "w-[100px] h-[61px]",
      },
    },
    {
      name: "Grape Seed Oil",
      description: "Enhances ingredient penetration and boosts skin softness.",
      position: "top-[244px] left-[717px]",
      arrow: {
        src: "/images/arrow-6.svg",
        position: "top-[317px] left-[619px]",
        size: "w-[127px] h-[73px]",
      },
    },
    {
      name: "Cinnamon Powder",
      description:
        "Natural antibacterial that helps purify and refresh the skin.",
      position: "top-[412px] left-[63px]",
      arrow: {
        src: "/images/arrow-4.svg",
        position: "top-[464px] left-[292px]",
        size: "w-[151px] h-[84px]",
      },
    },
    {
      name: "Honey",
      description:
        "Deeply moisturizing and soothing, supports a healthy glow.",
      position: "top-[392px] left-[719px]",
      arrow: {
        src: "/images/arrow-3.svg",
        position: "top-[460px] left-[614px]",
        size: "w-[151px] h-[84px]",
      },
    },
  ];

  return (
    <div className="bg-primaryy body-soap">
      <div className="ingredients_details">
        <div className="batch">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] tracking-[0] leading-[30px] whitespace-nowrap">
            Batch No: FS001
          </h2>
        </div>
        <img
          className=""
          alt="Rectangle"
          src="/upload/images/ingredients/body_soap.png"
        />
        <div className="items-center gap-2 flex flex-col relative justify-center usage">
          <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#ff3860] text-center tracking-[0] leading-9">
            USAGE
          </h2>
          <h3 className="[font-family:'Poppins',Helvetica] font-normal text-[#1c1c1cfc] text-center tracking-[0] leading-[15px]">
            Gently press the pump, use the face brush to wash your face while
            using a circular motion, rinse
            with clean water.
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
    </div >
  );
};
