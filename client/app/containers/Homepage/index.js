/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import ProductsShop from '../ProductsShop';
import BestSelling from '../BestSelling';
import Pagination from '../../components/Common/Pagination';
import actions from '../../actions';
import { FadeSlider } from '../../components/Common/CarouselSlider';

import { sortBanners } from './actions';

import NewArrivals from '../NewArrivals';
import HomepageCategories from '../HomepageCategories';
import Patronage from '../Patronage';
import GsapEffect from '../../components/Store/GsapEffect';
import Banners from '@/components/HomePageSections/Banners';
import homepageBanners from './banners.json'
import Achievement from '@/components/HomePageSections/Achievement';
import PopularCollections from '@/components/HomePageSections/PopularCollections';
import RestockedProducts from '@/components/HomePageSections/RestockedProducts';
import Trending from '@/components/HomePageSections/Trending';
import HomePageReview from '@/components/HomePageSections/Reviews';
import HomeMarquee from '@/components/HomePageSections/Marquee';
import InstagramCard from '@/components/InstaCard';
import { STORE_NAME } from '@/constants';
import ReviewSection from '@/components/HomePageSections/ReviewNew/ReviewSection';
import Ingredients from '@/components/HomePageSections/Ingredients';
import NewIngredients from '@/components/HomePageSections/NewIngredients';
import BannerPopup from '../../components/Common/BannerPopup';
import SurveyPopup from '../../components/Common/SurveyPopup';

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
}

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      &lt;
    </div>
  );
};


class Homepage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchHomeBanner();

    this.props.setShippingAddress();

    this.props.createWebsiteVisit();
    this.props.fetchNewArrivalsProducts();
    this.props.fetchBestSellingProducts();
    this.props.fetchAllProducts();
  }

  render() {
    const {
      banners, products,
      advancedFilters, filterProducts,
      maintenanceStatus, categoriesProducts,
      newArrivals, current_currency,
      all_currency, bestSelling,
      allProducts, authenticated,
      itemInCart, shopFormErrors,
      updateWishlist, handleRemoveFromCart,
      handleAddToCart
    } = this.props;
    const { totalPages, currentPage, count, limit, order } = advancedFilters;
    const displayPagination = totalPages > 1;
    const totalProducts = products.length;
    const left = limit * (currentPage - 1) + 1;
    const right = totalProducts + left - 1;

    const tempBanners = sortBanners(banners);

    const newBanners = tempBanners[1];
    const lengthBanners = newBanners.length;
    const modelUrl = tempBanners[0]
    const staticBanners = homepageBanners.banners;

    return (
      <div className="homePage flex flex-col gap-[2em]">
        <BannerPopup banners={banners} />

        <div className='header-container bg-linear md:rounded-br-[30%] overflow-hidden'>
          <Banners banners={staticBanners} hmm='text-sub-align-center-left' />
        </div>

        <Achievement />

        <PopularCollections
          collections={categoriesProducts}
          current_currency={current_currency}
          all_currency={all_currency}
        />

        <div className='hidden md:block'>
          <Ingredients />
        </div>
        <div className='block md:hidden'>
          <NewIngredients />
        </div>

        <RestockedProducts
          products={newArrivals}
          current_currency={current_currency}
          all_currency={all_currency}
          authenticated={authenticated}
          itemInCart={itemInCart}
          shopFormErrors={shopFormErrors}
          updateWishlist={updateWishlist}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToCart={handleAddToCart}
        />

        <Trending
          products={bestSelling}
          current_currency={current_currency}
          all_currency={all_currency}
          authenticated={authenticated}
          itemInCart={itemInCart}
          shopFormErrors={shopFormErrors}
          updateWishlist={updateWishlist}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToCart={handleAddToCart}
        />

        {/*<HomePageReview />*/}
        <ReviewSection />
        <SurveyPopup />

        <div className='my-5'>
          <HomeMarquee
            times={6}
            onHover={true}
            className='bg-black text-white'
            //gradient={true}
            text={<span className='text-white'>&copy; {new Date().getFullYear()} {STORE_NAME}</span>}
            //gradientWidth={50}
            //gradientColor='rgb(218, 62, 142)'
          />
        </div>
        <div className="pd-default">
          <InstagramCard products={allProducts} brandHandle={"tohanniees_skincare"} />
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  const localStorageSelectedCurrency = localStorage.getItem('select_currency');
  const selectCurrency = localStorageSelectedCurrency
    ? [localStorageSelectedCurrency]
    : state.currency.default_currency;
  let itemInCart = [];
  for (const i of state.cart.cartItems) {
    itemInCart.push(i._id)
  }
  return {
    advancedFilters: state.product.advancedFilters,
    products: state.product.storeProducts,
    newArrivals: state.product.newArrivals,  // actual store products
    banners: state.banner.homeBanners,
    maintenanceStatus: state.homepage.userMaintenanceStats,
    categoriesProducts: state.category.categoriesProducts,
    current_currency: selectCurrency,
    all_currency: state.currency.all_currency,
    bestSelling: state.product.bestSelling,
    allProducts: state.product.allProducts,

    authenticated: state.authentication.authenticated,
    itemInCart: itemInCart,
    shopFormErrors: state.product.shopFormErrors,
  }
};

export default connect(mapStateToProps, actions)(Homepage);