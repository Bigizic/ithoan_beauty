/**
 *
 * ProductsShop
 *
 */

import React from 'react';

import ProductList from '@/components/List/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const RelatedProducts = (props) => {
  const {
    products, isLoading,
    authenticated, updateWishlist,
    all_currency, currentCurrency,
    itemInCart, shopFormErrors,
    handleAddToCart, handleRemoveFromCart,
  } = props;
  const displayProducts = products && products.length > 0;

  return (
    <div className='products-shop'>
      {isLoading && <LoadingIndicator />}
      {displayProducts && (
        <ProductList
          className={'product-list'}
          parentClassName={'flex flex-wrap justify-around'}
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

export default RelatedProducts;
