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
import GsapEffect from '../../components/Store/GsapEffect';

class BestSelling extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  render() {
    const {
      tempProducts, isLoading,
      authenticated, updateWishlist,
      all_currency, currentCurrency,
      itemInCart, shopFormErrors,
      handleAddToCart, handleRemoveFromCart,
      homePageLoading,
    } = this.props;
    let products = tempProducts.slice(0, 8);  // display only first 8 products for best selling

    if (products.length === 8) {
      products = products
    } else {
      products = products.slice(0, 4);
    }

    const displayProducts = products && products.length > 0;
    

    return (
      <div className='products-shop'>
        {isLoading && homePageLoading &&  <LoadingIndicator />}
        {displayProducts && (
          <ProductList
            className={'best_selling_list'}
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
    tempProducts: state.product.bestSelling.length >= 4 ? state.product.bestSelling : state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,

    all_currency: state.currency.all_currency,
    currentCurrency: state.currency.select_currency.length > 0 ? state.currency.select_currency : state.currency.default_currency,
    itemInCart: itemInCart,
    shopFormErrors: state.product.shopFormErrors,
    homePageLoading: state.homepage.homePageIsLoading,
  };
};

export default connect(mapStateToProps, actions)(BestSelling);
