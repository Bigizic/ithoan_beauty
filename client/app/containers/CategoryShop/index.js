/**
 *
 * CategoryShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Banners from '@/components/HomePageSections/Banners';
import ShopFiltersComp from '@/components/Common/ShopFilters';
import ProductList from '@/components/List/ProductList';
import { withRouter } from '@/withRouter';

const toTitle = (s) =>
  s
    .replace(/[-_]+/g, ' ')           // hyphens/underscores → spaces
    .replace(/\b\w/g, ch => ch.toUpperCase()) // uppercase first letter of each word
    .trim();



class CategoryShop extends React.PureComponent {
  componentDidMount() {
    this.slug = this.props.match.params.slug;
    this.props.filterProducts('category', this.slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      this.slug = this.props.match.params.slug;
      this.props.filterProducts('category', this.slug);
    }
  }

  render() {
    const {
      products, isLoading,
      authenticated, updateWishlist,
      all_currency, currentCurrency,
      itemInCart, shopFormErrors,
      handleAddToCart, handleRemoveFromCart,
      minLabel,
      min,
      max,
      maxLabel,
      filterProducts,
      totalProducts,
      left,
      right,
      count,
      order,
      sortOptions
    } = this.props;
    const displayProducts = products && products.length > 0;
    const havePicsAlready = [
      {
        slug: 'kit',
        heading: 'Kit',
        sub: 'Complete skincare sets designed for a full, balanced routine',
        backgroundClassName: `
          w-full
          h-[60vh] md:h-[1000px]
          bg-cover-important
          bg-initial-important`
      },
      {
        slug: 'glow-oils',
        heading: 'Glow Oils',
        sub: 'Nourish and hydrate your skin with our radiant oil blends',
        backgroundClassName: `
          bg-cover-important w-full
          h-[60vh] md:h-[1000px]
          bg-center-important
          sm:bg-initial-important
          md:bg-center-important
          lg:bg-initial-important`
      },
      {
        slug: 'face-cream',
        heading: 'Face Cream',
        sub: 'Discover creams that leave your skin soft, smooth, and hydrated',
        backgroundClassName: `
          bg-cover-important w-full
          h-[60vh] md:h-[1000px]
          bg-initial-important
          md:bg-center-important`
      },
      {
        slug: 'face-soap',
        heading: 'Face Soap',
        sub: 'Gentle cleansing soaps crafted to refresh and protect your skin',
        backgroundClassName: `
          bg-cover-important
          w-full h-[60vh] md:h-[1000px]
          bg-initial-important
          md:bg-center-important`
      },
      {
        slug: 'body-cream',
        heading: 'Body Cream',
        sub: 'Indulge in rich creams that deliver deep, lasting hydration',
        backgroundClassName: `
          w-full
          h-[60vh] md:h-[1000px]
          bg-top-important
          bg-cover-important
          sm:bg-size-initial-important`
      },
      {
        slug: 'body-soap',
        heading: 'Body Soap',
        sub: 'Cleanse and refresh with soaps made for daily body care',
        backgroundClassName: `
          w-full
          h-[60vh] md:h-[1000px]
          bg-top-important
          bg-cover-important
          sm:bg-size-initial-important`
      }
    ]

    const bannerss = []
    for (const item of havePicsAlready) {
      if (this.slug) {
        if (item.slug === this.slug) {
          bannerss.push({
            title: toTitle(item.slug),
            sub: item.sub,
            imageUrl: `/upload/images/shop/${item.slug + '.png' || 'shop_group.png'}`,
            ...item
          })
        }
      }
    }
    if (bannerss.length === 0 && this.slug) {
      bannerss.push({
        title: toTitle(this.slug ? this.slug : ''),
        sub: "Explore Our Curated Selection Of Skincare Essentials Designed For Every Routine.",
        imageUrl: `/upload/images/shop/shop_group.png`,
        backgroundClassName: ''
      })
    }
    return (
      <div className='mb-[6em]'>
        {isLoading && <LoadingIndicator />}
        <div className='bg-linear overflow-hidden'>
          <Banners
            useBackground={true}
            banners={bannerss}
            backgroundClassName={bannerss.length > 0 ? bannerss[0].backgroundClassName : ''}
            hmm='text-sub-align-center-left-another text-sm md:text-xl lg:text-2xl'
            imageWidth='object-cover w-full h-[60vh] sm:h-full sm:w-full'
            imageContainerWidth='w-[100%]'
            scrollClass={'flex flex-col justify-center items-center w-full'}
            textWrapper="absolute flex left-0 top-0 w-full h-full
                           bg-gradient-to-b from-black/0 via-black/40 to-black/70
                           z-10 sm:pb-0"
          />
        </div>
        <div className='pd-default'>
          <ShopFiltersComp
            all_currency={all_currency}
            selectCurrency={currentCurrency}
            minLabel={minLabel}
            min={min}
            max={max}
            maxLabel={maxLabel}
            filterProducts={filterProducts}
            totalProducts={totalProducts}
            left={left}
            right={right}
            count={count}
            order={order}
            sortOptions={sortOptions}
          />
          {displayProducts && (
            <ProductList
              parentClassName={'flex flex-wrap justify-around'}
              products={products}
              authenticated={authenticated}
              updateWishlist={updateWishlist}
              all_currency={all_currency}
              current_currency={currentCurrency}
              itemInCart={itemInCart}
              shopFormErrors={shopFormErrors}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}

            />
          )}
          {!isLoading && !displayProducts && (
            <NotFound message='No products found.' />
          )}
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  let itemInCart = [];
  for (const i of state.cart.cartItems) {
    itemInCart.push(i._id)
  }

  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,

    all_currency: state.currency.all_currency,
    currentCurrency: state.currency.select_currency.length > 0 ? state.currency.select_currency : state.currency.default_currency,
    itemInCart: itemInCart,
    shopFormErrors: state.product.shopFormErrors,
  };
};

export default connect(mapStateToProps, actions)(withRouter(CategoryShop));
