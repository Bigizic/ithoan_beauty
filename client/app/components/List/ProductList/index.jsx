import React from "react";
import Button from "@/components/Store/Tags/Button";
import HyperLink from "@/components/Store/Tags/Link";
import ProductImgResolve from "@/components/Store/utils/productImgResolve";
import { CURRENCY } from "@/constants";
import { ShoppingCart } from 'lucide-react';
import AddToWishList from "@/components/Store/AddToWishList";
import { ResolvePrice } from "@/components/Store/utils/resolveProductPrice";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/scrollToTop";

const AddToCartBtn = ({ handleAddToCart, product, shopFormErrors }) => {
  return (
    <Button
      className="text-white w-full justify-center bg-black pl-[20px] pr-[20px] py-[8px] rounded-[5px]"
      text={"Add to Cart"}
      onClick={() => handleAddToCart(product)}
      disabled={
        product.quantity <= 0 && !shopFormErrors['quantity']
      }
      inlineElement={
        <ShoppingCart
          className="text-white"
          size={15}
        />
      }
    />
  )
}

const OutOfStockBtn = ({ product, shopFormErrors }) => {
  return (
    <Button
      className="text-black w-full justify-center bag-btn pl-[20px] pr-[20px] py-[8px] rounded-[5px]"
      text={"Out of Stock"}
      disabled={
        product.quantity <= 0 && !shopFormErrors['quantity']
      }
    />
  )
}

const RemoveFromCartBtn = ({ handleRemoveFromCart, product, shopFormErrors }) => {
  return (
    <Button
      className="text-white w-full justify-center bg-black pl-[10px] pr-[10px] py-[8px] rounded-[5px]"
      text={"Remove from Cart"}
      onClick={() => handleRemoveFromCart(product)}
      disabled={
        product.quantity <= 0 && !shopFormErrors['quantity']
      }
      inlineElement={
        <ShoppingCart
          className="text-white"
          size={15}
        />
      }
    />
  )
}

const ProductList = (props) => {
  const {
    products,
    current_currency,
    all_currency,
    updateWishlist,
    authenticated, itemInCart,
    shopFormErrors, handleRemoveFromCart,
    handleAddToCart, parentClassName
  } = props;
  const navigate = useNavigate();
  return (
    <div className={parentClassName ? parentClassName + ' gap-6 z-20 bg-white text-left' : " flex felx-row gap-6 z-20 bg-white text-left"}>
      {products && products.map((product, index) => (
        <div key={index} className="w-[158px] lg:w-[296px] relative">
          <div className='add-wishlist-box w-full absolute left-[6px] top-[6px]'>
            <AddToWishList
              id={product._id}
              liked={product?.isLiked ?? false}
              enabled={authenticated}
              updateWishlist={updateWishlist}
              authenticated={authenticated}
            />
          </div>
          <ProductImgResolve product={product} />
          <div className="text-xs sm:text-[18px] mt-[1em] w-full overflow-hidden text-left gap-[10px] flex flex-col justify-end h-[9em] lg:h-[5em]">
            <div className="flex flex-col gap-[10px] cursor-pointer"
              onClick={() => {
                navigate(`/product/${product.slug}`)
                ScrollToTop
              }}
            >
              <p className="overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>{product.name}</p>
              <div className="flex justify-between">
                <ResolvePrice product={product} all_currency={all_currency} current_currency={current_currency} />
                {product.totalReviews > 0 && (
                  <p className='mb-0 product_review_mb'>
                    <span className='fs-16 fw-normal mr-1'>
                      {parseFloat(product?.averageRating).toFixed(1)}
                    </span>
                    <span
                      className={`fa fa-star ${product.totalReviews !== 0 ? 'checked' : ''
                        }`}
                      style={{ color: '#ffb302' }}
                    ></span>
                  </p>
                )}
              </div>
            </div>
            <div
              className="border-none w-full justify-center text-center text-white"
            >
              {product.discountPrice <= 0 ? (
                <>
                  {itemInCart && itemInCart.includes(product._id) ? (
                    <RemoveFromCartBtn
                      product={product}
                      handleRemoveFromCart={handleRemoveFromCart}
                      shopFormErrors={shopFormErrors}
                    />
                  )
                    : product.quantity <= 0 && !shopFormErrors['quantity'] ?
                      (
                        <OutOfStockBtn
                          product={product}
                          shopFormErrors={shopFormErrors}
                        />
                      )
                      :
                      (
                        <AddToCartBtn
                          product={product}
                          shopFormErrors={shopFormErrors}
                          handleAddToCart={handleAddToCart}
                        />
                      )
                  }
                </>
              )
                :
                (
                  <>
                    {itemInCart && itemInCart.includes(product._id) ? (
                      <RemoveFromCartBtn
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                        shopFormErrors={shopFormErrors}
                      />
                    )
                      : product.quantity <= 0 && !shopFormErrors['quantity'] ? (
                        <OutOfStockBtn
                          product={product}
                          shopFormErrors={shopFormErrors}
                        />

                      )
                        : (
                          <AddToCartBtn
                            product={product}
                            shopFormErrors={shopFormErrors}
                            handleAddToCart={handleAddToCart}
                          />
                        )
                    }
                  </>
                )
              }
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default ProductList;
