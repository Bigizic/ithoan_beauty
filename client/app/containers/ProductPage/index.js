/**
 *
 * ProductPage
 *
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import DescriptionComponent from '../../utils/description';
import { withRouter } from '@/withRouter';
import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews';
import SocialShare from '../../components/Store/SocialShare';

import { currencyFunction } from '../../components/Common/currency/currency_function';
import { Shimmer } from '../../components/Common/shimmerEffect';
import RelatedProducts from '../RelatedProducts';
import { ShoppingCart } from 'lucide-react';

const MyComponent = (props) => {
  const { all_currency, selectCurrency, productPrice, productDiscountPrice } = props;
  const [productprice, setRess] = useState(null);
  const [discountPrice, setDis] = useState(null);

  useEffect(() => {
    let isMounted = true; // To avoid setting state if the component is unmounted
    if (['gbp', 'usd'].includes(selectCurrency[0])) {
      if (productDiscountPrice >= 0) {
        const num = productPrice;
        const discountAmount = num * (productDiscountPrice / 100);
        currencyFunction(all_currency, selectCurrency, num - discountAmount)
          .then((discountedPrice) => {
            if (isMounted) setDis(discountedPrice)
          })
          .catch((error) => {
            console.error('Error in discountPrice', error);
          });
      }
      currencyFunction(all_currency, selectCurrency, productPrice)
        .then((result) => {
          if (isMounted) setRess(result);
        })
        .catch((error) => {
          console.error('Error in currencyFunction:', error);
        });

      return () => {
        isMounted = false; // Cleanup function
      };
    } else {
      if (productDiscountPrice >= 0) {
        const discountAmount = productPrice * (productDiscountPrice / 100);
        if (isMounted) {
          const tempDes = (productPrice - discountAmount).toLocaleString();
          setDis(`${all_currency[selectCurrency[0]]}${tempDes}`);
          const tempPri = productPrice.toLocaleString();
          setRess(`${all_currency[selectCurrency[0]]}${tempPri}`);
        }
      }
    }
  }, [all_currency, selectCurrency, productPrice]);


  return (
    <div>
      {!productPrice && !discountPrice && <Shimmer width='60px' height='20px' />}
      {productDiscountPrice > 0 ? (
        <div>
          <div style={{ display: 'flex' }}>
            <p style={{ textDecoration: 'line-through', textDecorationColor: '#da3e8e' }} className='price mb-0'>{productprice}</p>
            <span style={{
              color: '#fff',
              background: 'black',
              marginLeft: '10px',
              height: 'fit-content',
              padding: '0px 3px'
            }}>-{(productDiscountPrice).toFixed(2)}%</span>
          </div>
          <p className='price mb-0'>{discountPrice}</p>
        </div>
      )
        :
        (
          <p className='price mb-0'>{discountPrice}</p>
        )}
    </div>
  );
};


class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;

    this.props.fetchStoreProduct(slug);
    this.props.fetchProductReviews(slug);

    // for related products
    this.props.onSuggestionsFetchRequested({ value: slug.split('-')[0].slice(0, 3) }, true);
    document.body.classList.add('product-page');
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('product-page');
  }

  render() {
    const {
      isLoading,
      product,
      productShopData,
      shopFormErrors,
      itemInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors,

      selectCurrency,
      all_currency,

      relatedProducts,
      updateWishlist,
      authenticated,
      relatedProductsItemInCart,

    } = this.props;
    let filteredRelatedProducts = relatedProducts.filter(x => x.name !== product.name);

    return (
      <div className='product-shop mt-[12em] lg:mt-[18em] pd-default'>
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className='flex-row'>
              <Col xs='12' md='5' lg='5' className='mb-3 md:px-3'>
                <div className='position-relative'>
                  <img
                    className='item-image'
                    src={`${product.imageUrl
                      ? product.imageUrl
                      : '/images/placeholder-image.png'
                      }`}
                  />
                  {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
                    <p className='stock out-of-stock'>Out of stock</p>
                  ) : (
                    <p className='stock in-stock'>In stock</p>
                  )}
                </div>
              </Col>
              <Col xs='12' md='7' lg='7' className='mb-3 md:px-3'>
                <div className='product-container'>
                  <div className='item-box'>
                    <div className='item-details'>
                      <h1 className='item-name'>
                        {product.name}
                      </h1>

                      <div className='item-desc'>{<DescriptionComponent content={product.description} />} </div>
                      <div className='price'>
                        <MyComponent
                          all_currency={all_currency}
                          selectCurrency={selectCurrency}
                          productPrice={product.price}
                          productDiscountPrice={product.discountPrice}
                        >
                        </MyComponent>
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <div className='item-customize'>
                        <Input
                          type={'increment'}
                          error={shopFormErrors['quantity']}
                          label={'Quantity '}
                          name={'quantity'}
                          decimals={false}
                          min={1}
                          max={product.inventory}
                          placeholder={'Product Quantity'}
                          disabled={
                            product.inventory <= 0 && !shopFormErrors['quantity']
                          }
                          value={productShopData.quantity}
                          onInputChange={(name, value) => {
                            productShopChange(name, value);
                          }}
                        />
                      </div>

                      <div className=''>
                        {product.quantity > 0 ?
                          (product.oldQuantity > 0 ?
                            (
                              <span style={{ padding: '4px 8px', color: '#fff', background: '#da3e8e', fontSize: '11px', border: '0px', borderRadius: '5px', display: 'inline-block' }}>{product.oldQuantity} in stock</span>
                            )
                            :
                            (
                              <span style={{ padding: '4px 8px', color: '#fff', background: '#da3e8e', fontSize: '11px', border: '0px', borderRadius: '5px', display: 'inline-block' }}>{product.quantity} in stock</span>
                            )
                          )
                          :
                          (
                            <span style={{ padding: '4px 8px', color: '#fff', background: '#da3e8e', fontSize: '11px', border: '0px', borderRadius: '5px', display: 'inline-block' }}>out of stock</span>
                          )
                        }
                      </div>
                    </div>

                    <div className='item-actions'>
                      {itemInCart ? (
                        <Button
                          variant='primary'
                          disabled={
                            product.inventory <= 0 &&
                            !shopFormErrors['quantity']
                          }
                          text='Remove From Cart'
                          className='bag-btn product-page-remove-from-cart'
                          icon={<ShoppingCart />}
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : (
                        <Button
                          variant='primary'
                          disabled={
                            product.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text='Add To Cart'
                          className='bag-btn product-page-add-to-cart'
                          icon={<ShoppingCart />}
                          onClick={() => handleAddToCart(product)}
                        />
                      )}
                    </div>
                    <div className='my-4 item-share'>
                      <SocialShare product={product} />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
            />
            {
              filteredRelatedProducts.length > 0 &&
              (

                <div className='related_products'>
                  <div className="homepage_category_h2_text_container relatedProducts_h2_text_container">
                    <h2 data-aos="fade-right" data-aos-once="false" className='related-product-h2'>{filteredRelatedProducts.length > 1 ? "Related Products" : "Related Product"}</h2>
                  </div>

                  <div className='related_products_container'>

                    <RelatedProducts
                      products={filteredRelatedProducts}
                      authenticated={authenticated}
                      itemInCart={relatedProductsItemInCart}
                      updateWishlist={updateWishlist}
                      all_currency={all_currency}
                      currentCurrency={selectCurrency}
                      shopFormErrors={shopFormErrors}
                      handleAddToCart={handleAddToCart}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  </div>
                </div>
              )}
          </>
        ) : (
          <NotFound message='No product found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const itemInCart = state.cart.cartItems.find(
    item => item._id === state.product.storeProduct._id
  )
    ? true
    : false;
  const sL = state.currency.select_currency.length;
  let relatedProductsItemInCart = [];
  for (const i of state.cart.cartItems) {
    relatedProductsItemInCart.push(i._id)
  }

  return {
    relatedProducts: state.navigation.relatedProducts,
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review.productReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,

    itemInCart,
    relatedProductsItemInCart,
    all_currency: state.currency.all_currency,
    selectCurrency: sL > 0 ? state.currency.select_currency : state.currency.default_currency,
  };
};

export default connect(mapStateToProps, actions)(withRouter(ProductPage, MyComponent));
