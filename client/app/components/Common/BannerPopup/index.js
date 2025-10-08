import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const BannerPopup = ({ banners }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const popupBanners = banners.filter(banner => banner.isPopup && banner.isActive);

    if (popupBanners.length === 0) return;

    const activeBanner = popupBanners[0];
    const bannerId = activeBanner._id;
    const storageKey = `banner_popup_${bannerId}`;
    const lastClosedTime = localStorage.getItem(storageKey);

    if (lastClosedTime) {
      const timePassed = Date.now() - parseInt(lastClosedTime);
      const durationInMs = (activeBanner.displayDuration || 5) * 60 * 1000;

      if (timePassed < durationInMs) {
        return;
      }
    }

    setCurrentBanner(activeBanner);
    setIsVisible(true);
  }, [banners]);

  const handleClose = () => {
    if (currentBanner) {
      const storageKey = `banner_popup_${currentBanner._id}`;
      localStorage.setItem(storageKey, Date.now().toString());
    }
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    if (!currentBanner) return;

    const { linkType, categorySlug } = currentBanner;

    if (linkType === 'category' && categorySlug) {
      navigate(`/shop/category/${categorySlug}`);
    } else {
      navigate('/shop');
    }

    handleClose();
  };

  if (!isVisible || !currentBanner) return null;

  return (
    <div className="banner-popup-overlay">
      <div className="banner-popup-container">
        <button
          className="banner-popup-close"
          onClick={handleClose}
          aria-label="Close popup"
        >
          ×
        </button>
        <div className="banner-popup-content">
          <img
            src={currentBanner.imageUrl}
            alt="Banner"
            className="banner-popup-image"
          />
          <div className="banner-popup-action">
            <button
              className="banner-popup-button"
              onClick={handleButtonClick}
            >
              {currentBanner.buttonText || 'Shop Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPopup;
