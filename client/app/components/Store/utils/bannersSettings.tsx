import { Settings } from 'react-slick';
import NextArrow from "../Icons/NextArrow";
import PrevArrow from "../Icons/PrevArrow";

const bannerConfig = (banners: any[]): Settings => {
    const bannerConfiguration: Settings = {};

    bannerConfiguration.fade = true;
    bannerConfiguration.speed = 2500;
    bannerConfiguration.infinite = true;
    bannerConfiguration.slidesToShow = 1;
    bannerConfiguration.slidesToScroll = 1;
    bannerConfiguration.autoplaySpeed = 2500;
    bannerConfiguration.dots = banners.length > 1;
    bannerConfiguration.autoplay = banners.length > 1;
    bannerConfiguration.arrows = banners.length > 1;
    bannerConfiguration.nextArrow = banners.length > 1 ? <NextArrow /> : undefined;
    bannerConfiguration.prevArrow = banners.length > 1 ? <PrevArrow /> : undefined;
    bannerConfiguration.swipeToSlide = banners.length > 1;

    return bannerConfiguration;
}

export default bannerConfig;