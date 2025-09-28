import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { currencyFunction } from '../../Common/currency/currency_function';
import AddToWishList from '../AddToWishList';
import Button from '../../Common/Button';
import { WhiteBagIcon, MinusWhiteBagIcon } from '../../Common/Icon';
import { Input } from 'reactstrap';
import { Shimmer } from '../../Common/shimmerEffect';


const calculateMaxQuantity = (products) => {
  let i;
  i = products[0].quantity;

  for(let c = 1; c < products.length; c++) {
    i > products[c].quantity ? i = i : i = products[c].quantity
  }
  return (i);
}


const ProductList = props => {
  const {
    products, updateWishlist,
    authenticated, currentCurrency,
    all_currency, itemInCart,
    shopFormErrors, handleRemoveFromCart,
    handleAddToCart, className
  } = props;
  // const quantityMax = calculateMaxQuantity(products);

  const [productPrices, setProductPrices] = useState({});
  const [discountPrices, setDiscountPrices] = useState({})

  useEffect(() => {
    let isMounted = true;
  
    const fetchPrices = async () => {
      const prices = {};
      const discounts = {};
  
      try {
        const pricePromises = products.map(async (product) => {
          let price = await currencyFunction(all_currency, currentCurrency, product.price);
          if (['gbp', 'usd'].includes(currentCurrency[0])) {
            if (product.discountPrice >= 0) {
              const num =  product.price;
              const discountAmount = num * (product.discountPrice / 100);
              const discountedPrice = await currencyFunction(all_currency, currentCurrency, num - discountAmount);
    
              discounts[product._id] = discountedPrice;
            }
    
            prices[product._id] = price;
          } else {  
          if (product.discountPrice >= 0) {
            const num = parseInt(price.replace(/[^0-9]/g, ''), 10);
            const discountAmount = num * (product.discountPrice / 100);
            const discountedPrice = await currencyFunction(all_currency, currentCurrency, num - discountAmount);
  
            discounts[product._id] = discountedPrice;
          }
  
          prices[product._id] = price;
        }
        });
  
        await Promise.all(pricePromises);
  
        if (isMounted) {
          setProductPrices(prices);
          setDiscountPrices(discounts);
        }
      } catch (error) {
        console.error('Error fetching currency price:', error);
      }
    };
  
    fetchPrices();
  
    return () => {
      isMounted = false; // Cleanup function
    };
  }, [products, currentCurrency]);


  return (
    <div className={className}>
      {/*<div key={index} className={ index >= 0 && index % 2 === 0 ? 'homepageProducts mb-3 mb-md-0' : 'homepageProductsRight mb-3 mb-md-0' }>*/}
      {products.map((product, index) => (
        <div key={index} className="homepageProducts mb-3 mb-md-0">
          <div className='product-container'>
            <div className='item-box'>
              <div className='add-wishlist-box'>
                <AddToWishList
                  id={product._id}
                  liked={product?.isLiked ?? false}
                  enabled={authenticated}
                  updateWishlist={updateWishlist}
                  authenticated={authenticated}
                />
              </div>

              <div className='item-link'>
                <Link
                  to={`/product/${product.slug}`}
                  className='d-flex flex-column h-100'
                >
                  <div className='item-image-container'>
                    <div className='item-image-box'>
                      <img
                        className='product_list_image_file item-image'
                        src={`${
                          product.imageUrl
                            ? product.imageUrl
                            : '/images/placeholder-image.png'
                        }`}
                      />
                    </div>
                  </div>
                  <div className='item-body'>
                    <div className='item-details p-3'>
                      <h1 className='item-name'>{product.name}</h1>
                      </div>
                  </div>
                  <div className='d-flex flex-row justify-content-between align-items-center px-3 mb-3 item-footer'>

                    {/* display the resolved price */}

                    { product.discountPrice > 0 ?  
                    (
                      <div className='product_original_price_and_product_discount_price'>
                       <p style={{ textAlign: 'left' }} className='price mb-0'>{discountPrices[product._id]}</p>
                        <div className='popapdpf'>
                        {productPrices[product._id] ? (
                          <div style={{ display: 'flex' }}>
                          <p style={{ textDecoration: 'line-through', textDecorationColor: '#da3e8e', fontSize: '15px', color: '#cecece' }} className='price mb-0'>
                            {productPrices[product._id]}
                          </p>
                          <span className='product_list_discount_price'>-{(product.discountPrice).toFixed(2)}%
                        </span>
                          </div>
                          ) : (
                            <Shimmer width="60px" height="20px" />
                        )}
                        </div>
 
                      </div>
                    )
                    :
                    (
                      <p className='price mb-0'>
                        {productPrices[product._id]}
                      </p>
                    )
                    }
                      

                    {product.totalReviews > 0 && (
                      <p className='mb-0 product_review_mb'>
                        <span className='fs-16 fw-normal mr-1'>
                          {parseFloat(product?.averageRating).toFixed(1)}
                        </span>
                        <span
                          className={`fa fa-star ${
                            product.totalReviews !== 0 ? 'checked' : ''
                          }`}
                          style={{ color: '#ffb302' }}
                        ></span>
                      </p>
                    )}
                  </div>

                </Link>

                { product.discountPrice <= 0 ?
                (
                <div
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  margin: '10px 0px 10px 0px',
                }} className='item-actions'>
                      {itemInCart && itemInCart.includes(product._id) ? (
                        <Button
                          round={20}
                          variant='primary'
                          disabled={
                            product.inventory <= 0 &&
                            !shopFormErrors['quantity']
                          }
                          text='Remove From Cart'
                          icon={<MinusWhiteBagIcon></MinusWhiteBagIcon>}
                          className='bag-btn add_to_cart_homepage_button'                        
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : product.quantity <= 0 && !shopFormErrors['quantity'] ?
                      (
                        <Button
                          round={20}
                          variant='primary'
                          disabled={
                            product.quantity <= 0 && !shopFormErrors['quantity']
                          }
                          text='Out Of Stock'
                          className='bag-btn out_of_stock_homepage_button'
                        />
                      ) : (
                      <Button
                        round={20}
                        variant='primary'
                        disabled={
                          product.quantity <= 0 && !shopFormErrors['quantity']
                        }
                        icon={<WhiteBagIcon></WhiteBagIcon>}
                        text='Add To Cart'
                        className='bag-btn add_to_cart_homepage_button'                        
                        onClick={() => handleAddToCart(product)}
                      />
                      )
                      }
                    </div>
                    ):(
                    <div
                    style={{
                      display: 'flex',
                      alignSelf: 'center',
                      margin: '10px 0px 20px 0px',
                    }} className='item-actions'>
                          {itemInCart && itemInCart.includes(product._id) ? (
                            <Button
                              round={20}
                              variant='primary'
                              disabled={
                                product.inventory <= 0 &&
                                !shopFormErrors['quantity']
                              }
                              text='Remove From Cart'
                              icon={<MinusWhiteBagIcon></MinusWhiteBagIcon>}
                              className='bag-btn add_to_cart_homepage_button'                        
                              onClick={() => handleRemoveFromCart(product)}
                            />
                          ) : product.quantity <= 0 && !shopFormErrors['quantity'] ?
                          (
                            <Button
                              round={20}
                              variant='primary'
                              disabled={
                                product.quantity <= 0 && !shopFormErrors['quantity']
                              }
                              text='Out Of Stock'
                              className='bag-btn out_of_stock_homepage_button'
                            />
                          ) : (
                          <Button
                            round={20}
                            variant='primary'
                            disabled={
                              product.quantity <= 0 && !shopFormErrors['quantity']
                            }
                            icon={<WhiteBagIcon></WhiteBagIcon>}
                            text='Add To Cart'
                            className='bag-btn add_to_cart_homepage_button'                        
                            onClick={() => handleAddToCart(product)}
                          />
                          )
                          }
                        </div>
                        )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
