import React from "react";

export const FacialWashFrame = () => {
  const ingredients = [
    {
      name: "Water",
      description: "Refreshing base that helps dissolve impurities and deliver hydration.",
    },
    {
      name: "Fragrance",
      description: "Adds a refreshing scent for an uplifting cleansing experience.",
    },
    {
      name: "Niacinamide",
      description: "Brightens skin tone, reduces dullness, and supports a healthy barrier.",
    },
    {
      name: "Propylene Glycol",
      description: "Boosts moisture retention and enhances smoothness.",
    },
  ];

  return (
    <div className="bg-primaryy rounded-2xl overflow-hidden flex-shrink-0 w-[340px] sm:w-[500px] lg:w-[700px] xl:w-[900px] h-auto">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12">
        <div className="flex flex-col items-center justify-center gap-4 lg:w-1/2">
          <div className="text-center lg:text-left w-full">
            <h2 className="font-poppins font-bold text-[#ff3860] text-lg sm:text-xl tracking-wide">
              Batch No: HF001
            </h2>
          </div>
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] aspect-square flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              alt="Facial Wash"
              src="/upload/images/ingredients/facial_wash.png"
            />
          </div>
          <div className="flex flex-col gap-2 text-center lg:text-left w-full mt-4">
            <h2 className="font-poppins font-bold text-[#ff3860] text-lg sm:text-xl tracking-wide">
              USAGE
            </h2>
            <p className="font-poppins text-sm sm:text-base text-gray-800 leading-relaxed">
              Gently press the pump, use the face brush to wash your face while using a circular motion, rinse with clean water.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 lg:w-1/2 justify-center">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5"
              data-aos="fade-up"
              data-aos-once="false"
              data-aos-delay={index * 100}
              data-aos-duration="600"
            >
              <h3 className="font-poppins font-semibold text-[#ff3860] text-base sm:text-lg">
                {ingredient.name}
              </h3>
              <p className="font-poppins text-sm sm:text-base text-gray-700 leading-relaxed">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
