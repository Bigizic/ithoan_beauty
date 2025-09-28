/**
 *
 * ProductsShop
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { Link } from 'react-router-dom';
import Patronage from '../Patronage';

class NewArrivals extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
    this.props.fetchNewArrivalsProducts();
  }

  render() {
    const {
      tempProducts, isLoading,
      authenticated, updateWishlist,
      all_currency, currentCurrency,
      itemInCart, shopFormErrors,
      handleAddToCart, handleRemoveFromCart,
    } = this.props;
    const products = tempProducts.slice(0, 8);  // display only first 8 products for new arrivals

    const displayProducts = products && products.length > 0;

    return (
      <div className='products-shop'>
        {isLoading && <LoadingIndicator />}
        {displayProducts && (
          <ProductList
            className={'new_arrivals_list'}
            products={products}
            authenticated={authenticated}
            updateWishlist={updateWishlist}
            all_currency={all_currency}
            currentCurrency={currentCurrency}
            itemInCart={itemInCart}
            shopFormErrors={shopFormErrors}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}

          />
        )}
        {!isLoading && !displayProducts && (
          <NotFound message='No products found.' />
        )}
        {displayProducts && (
          <div className='new_arrivals_view_all'>
            <Link to='/shop'>View All</Link>
          </div>
        )}
        <Patronage cls={'last_video'} srcSec={'/images/banners/skincare_video_3.mp4'} src={'/images/banners/skincare_video_3.webm'} text={'Radiant Skin for Everyone No Matter Your Shade!'}/>

      </div>
    );
  }
}

const mapStateToProps = state => {
  let itemInCart = [];
  for (const i of state.cart.cartItems) {
    itemInCart.push(i._id)
  }

  return {
    tempProducts: state.product.newArrivals,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,

    all_currency: state.currency.all_currency,
    currentCurrency: state.currency.select_currency.length > 0 ? state.currency.select_currency : state.currency.default_currency,
    itemInCart: itemInCart,
    shopFormErrors: state.product.shopFormErrors,
  };
};

export default connect(mapStateToProps, actions)(NewArrivals);
