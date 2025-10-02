import React from 'react';
import HyperLink from '../../Store/Tags/Link';
import ProductList from '../../List/ProductList';
import RowCarousel from '../../Store/Others/RowCarousel';
import ProductImgResolve from '../../Store/utils/productImgResolve';
import Button from '../../Store/Tags/Button';
import { VitaminCFrame } from './VitaminC';
import { FacialWashFrame } from './FacialWash';
import { FaceTonerFrame } from './FaceToner';
import { BodySoapFrame } from './BodySoap';
const Ingredients = () => {

  return (
    <section className='ingredients mt-[48px] sm:mt-[80px] px-0'>
      <div className='text-center flex flex-col gap-[8px] pd-default'>
        <h2 className='text-center font-spectral heading-text font-extrabold'>Ingredients That Deliver Results</h2>
        <p className='text-center subHead-text'>Every ingredients chosen with purpose, every result refined</p>
      </div>
      <div className='ingredients_container bg-white py-6 mt-4'>
        <RowCarousel
          buttonClassName={"carousel-buttons-2-z-index"}
          buttonClassLeftName={"left-[10px]"}
          buttonClassRightName={"right-[10px]"}
        >
          <VitaminCFrame />
          <FacialWashFrame />
          <FaceTonerFrame />
          <BodySoapFrame />
        </RowCarousel>
      </div >
    </section >
  );
}

export default Ingredients;