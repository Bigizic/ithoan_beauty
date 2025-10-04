import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import { sortBanners } from '../Homepage/actions';

const MyComponent = ({ modelUrl, item }) => {
  return (
    <div className='category_count'>
      <div className="our_collections_product_container">
        <div className='item-image-container'>
          <div className='item-image-box'>
            <img
              className='product_list_image_file item-image'
              src={`${
                item.product.imageUrl
                  ? item.product.imageUrl
                  : '/images/placeholder-image.png'
              }`}
              alt={item.categoryName}
            />
          </div>
        </div>
        <Link to={`shop/category/${item.categorySlug}`}>{item.categoryName}</Link>
      </div>
    </div>
  );
};

const HomepageCategories = ({ categoriesProducts, firstmodelBanners, fetchOurCollections }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchOurCollections();
  }, [fetchOurCollections]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className='homeCategories'>
      {categoriesProducts && (
        <div className='homeCategories_flexwrap' ref={scrollRef}>
          {categoriesProducts.map((item, index) => (
            <MyComponent key={index} item={item} modelUrl={firstmodelBanners?.imageUrl} />
          ))}
        </div>
      )}

      {/* Left scroll button */}
      <div className="carousel-buttons carousel-buttons-left" onClick={scrollLeft}>
        <span>&lt;</span>
      </div>

      {/* Right scroll button */}
      <div className="carousel-buttons carousel-buttons-right" onClick={scrollRight}>
        <span>&gt;</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const banners = state.banner.homeBanners;
  const modelBanners = sortBanners(banners)[0];
  return {
    categories: state.category.storeCategories,
    firstmodelBanners: modelBanners[0],
    categoriesProducts: state.category.categoriesProducts
  };
};

export default connect(mapStateToProps, actions)(HomepageCategories);
