/**
 *
 * ProductsShop
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import ProductList from '@/components/List/ProductList';
import { withRouter } from '@/withRouter';
//import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Banners from '@/components/HomePageSections/Banners';
import ShopFiltersComp from '@/components/Common/ShopFilters';

class ProductsShop extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
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
    const bannerss = [{
      title: 'Shop Products',
      sub: 'Explore our curated selection of skincare essentials.',
      imageUrl: '/upload/images/shop/shop_group.png'
    }]

    return (
      <div className=''>
        {/* isLoading && <LoadingIndicator /> */}
        <div className='bg-linear overflow-hidden'>
          <Banners
            banners={bannerss}
            titleDataAosDelay='200'
            subDataAosDelay='400'
            hmm='text-sub-align-center-left-another'
            imageWidth='object-cover w-full h-[60vh] sm:h-full'
            imageContainerWidth='w-[100%]'
            scrollClass={'flex flex-col justify-center items-center w-full'}
            textWrapper="overlay-full"
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

export default connect(mapStateToProps, actions)(withRouter(ProductsShop));
