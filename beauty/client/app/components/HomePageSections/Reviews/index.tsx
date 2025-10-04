import React, { useState, useEffect } from "react";
import FadeSlider from "../../Store/Others/FadeSlider";
import ReviewCard from "./ReviewCard";
import bannerConfig from "../../Store/utils/bannersSettings";
import { Settings } from 'react-slick';
import SlickSlider from "@/components/Store/Others/SlickSlider";
import reviewData from './review.json';

interface User {
  name: string;
  email?: string;
}

interface Review {
  rating: number;
  title: string;
  review: string;
  user: User;
}

interface HomePageReviewProps {
  reviews: Review[];
}

const HomePageReview: React.FC<HomePageReviewProps> = () => {
  const { reviews } = reviewData;
  const bannerSetting = bannerConfig(reviews)
  bannerSetting.fade = false;
  bannerSetting.arrows = false;
  bannerSetting.nextArrow = undefined;
  bannerSetting.prevArrow = undefined;

  const filteredReviews = reviews ? reviews.filter(review => review.rating >= 4) : [];

  return (
    <div className="homepage_reviews pd-default flex flex-col md:flex-row md:space-x-12 py-12 md:justify-between">
      {/* left side text */}
      <div className="md:w-[50%] mb-6 md:mb-0">
        <h2 className="font-spectral text-3xl md:text-[35px] lg:text-5xl font-extrabold mb-4 text-center md:text-left">
          What Our Customers Say
        </h2>
        <p className="text-sm md:text-xl lg:text-xl leading-relaxed text-center md:text-left">
          Our customers share how Tohanniees Skincare products brings glow,
          confidence, care and trust to their daily routine
        </p>
      </div>

      <div className="md:w-[50%]">
        <SlickSlider
          dots={bannerSetting.dots}
          infinite={bannerSetting.infinite}
          speed={bannerSetting.speed}
          slidesToShow={bannerSetting.slidesToShow}
          slidesToScroll={bannerSetting.slidesToScroll}
          fade={bannerSetting.fade}
          autoplay={bannerSetting.autoplay}
          autoplaySpeed={bannerSetting.autoplaySpeed}
          arrows={bannerSetting.arrows}
          nextArrow={bannerSetting.nextArrow}
          prevArrow={bannerSetting.prevArrow}
          swipeToSlide={bannerSetting.swipeToSlide}
        >
          {filteredReviews.map((review, index) => (
            <div key={index}
                 className="review-card-container flex flex-row h-[400px] overflow-y-auto justify-center"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </SlickSlider>
      </div>
    </div>
  );
}

export default HomePageReview;