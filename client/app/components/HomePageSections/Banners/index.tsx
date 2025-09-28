'use client'

import React from "react"
import Image from "next/image"
import FadeSlider from "../../Store/Others/FadeSlider"
import bannerConfig from "../../Store/utils/bannersSettings"
import HyperLink from "../../Store/Tags/Link"
import ProductImgResolve from "@/components/Store/utils/productImgResolve"
import ScrollTranslate from "@/components/Common/ScrollTranslate"

interface Banner {
  imageUrl: string
  title: string
  sub: string
  link: string
  isActive: boolean
  isDefault: boolean
  btnText: string
}

interface BannersProps {
  banners: Banner[]
  isLoading?: boolean
  imageWidth?: string
  imageContainerWidth?: string
  textWrapper?: string
  scrollClass?: string
  hmm: string
  subDataAosDelay: string
  titleDataAosDelay: string
  useBackground: boolean
  backgroundClassName: string
}

const Banners: React.FC<BannersProps> = (props) => {
  let {
    banners, imageWidth,
    imageContainerWidth, textWrapper,
    scrollClass, hmm,
    subDataAosDelay, titleDataAosDelay,
    useBackground=false, backgroundClassName,
  } = props
  let bannerSetting = bannerConfig(banners) || {}

  if (banners) {
    bannerSetting = bannerConfig(banners)
    banners = banners.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
  }

  return (
    <div className="homepage_banners h-[70%] lg:h-[100%] mt-[8em] lg:mt-[12em]">
      <FadeSlider
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
        {banners &&
          banners.map((item, index) => (
            <div
              key={index}
              className="banner-container relative flex flex-col md:flex-row items-center"
            >
              {/* text wrapper with background */}
              <div
                className={`${textWrapper ? textWrapper : `absolute md:relative bottom-0 md:top-0 left-0 w-full md:w-[50%] h-fit 
                           bg-gradient-to-b from-black/0 via-black/40 to-black/70 
                           md:bg-gradient-to-b md:from-black/0 md:via-black/0 md:to-black/0 
                           z-10 pd-default pb-[1em] sm:pb-0` }`}
              >
                {/* moving text content */}
                <ScrollTranslate multiplier={0.2} className={scrollClass ? scrollClass : "flex flex-col justify-center items-center md:items-start"}>
                  <p
                    className="font-spectral text-white mb-4 text-4xl md:text-[48px] lg:text-[56px] leading-tight font-extrabold p-0"
                    data-aos="fade-right"
                    data-aos-delay={titleDataAosDelay ? titleDataAosDelay : "800"}
                  >
                    {item.title}
                  </p>
                  <p
                    className={"text-white text-sm lg:text-lg" + hmm ? hmm : 'text-white'}
                    data-aos="fade-right"
                    data-aos-delay={subDataAosDelay ? subDataAosDelay : "1100"}
                  >
                    {item.sub}
                  </p>
                  {item.link &&
                    <HyperLink to={item.link} className="mt-4 mb-4 p-0">
                      {item.btnText &&
                        <button
                          className="rounded-[5px] bg-other text-white p-[4px] sm:p-[8px] px-[8px] sm:px-[16px] text-[14px] sm:text-[16px]"
                        >
                          {item.btnText}
                        </button>
                      }
                    </HyperLink>
                  }
                </ScrollTranslate>
              </div>

              {/* image */}
              {useBackground ? (
                <div className={imageContainerWidth ? imageContainerWidth : "w-[100%] md:w-[50%]"}>
                  <div
                    style={
                      {
                        background: `url(${item.imageUrl})`,
                        backgroundRepeat: 'no-repeat',
                      }
                    }
                    className={backgroundClassName}
                  >

                  </div>
                </div>
              )
                : (
                  <div className={imageContainerWidth ? imageContainerWidth : "w-[100%] md:w-[50%]"}>
                    <ProductImgResolve
                      className={imageWidth ? imageWidth : "object-fit w-full h-full lg:w-[90vh] lg:h-[100vh]"}
                      src={item.imageUrl}
                      width={1200}
                      height={800}
                      data-aos="zoom-in"
                      data-aos-delay="900"
                    />
                  </div>
                )
              }
            </div>
          ))
        }
      </FadeSlider >
    </div >
  )
}

export default Banners