import React from 'react';
import RowCarousel from '../../Store/Others/RowCarousel';
import { VitaminCFrame } from './VitaminC';
import { FacialWashFrame } from './FacialWash';
import { FaceTonerFrame } from './FaceToner';
import { BodySoapFrame } from './BodySoap';

const NewIngredients = () => {
  return (
    <section className='mt-12 sm:mt-20 px-0'>
      <div className='text-center flex flex-col gap-2 px-4 sm:px-8 mb-8 sm:mb-12'>
        <h2 className='text-center font-spectral text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900'>
          Ingredients That Deliver Results
        </h2>
        <p className='text-center text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
          Every ingredient chosen with purpose, every result refined
        </p>
      </div>
      <div className='bg-white py-4 sm:py-8'>
        <RowCarousel
          buttonClassName="z-10"
          buttonClassLeftName="left-4"
          buttonClassRightName="right-4"
          secClassName="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth px-4 sm:px-8 no-scrollbar"
        >
          <VitaminCFrame />
          <FacialWashFrame />
          <FaceTonerFrame />
          <BodySoapFrame />
        </RowCarousel>
      </div>
    </section>
  );
}

export default NewIngredients;