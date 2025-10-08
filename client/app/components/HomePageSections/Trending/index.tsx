import React from "react";
import ProductList from "../../List/ProductList";
import RowCarousel from "@/components/Store/Others/RowCarousel";
import HyperLink from "@/components/Store/Tags/Link";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
}

interface TrendingProps {
  products: Product[]
  current_currency?: any
  all_currency?: any
  updateWishlist?: any
  authenticated: any
  itemInCart: any
  shopFormErrors: any
  handleRemoveFromCart: any
  handleAddToCart: any
}

const Trending: React.FC<TrendingProps> = (props: TrendingProps) => {
  const {
    updateWishlist, products,
    current_currency, all_currency,
    authenticated, itemInCart,
    shopFormErrors, handleRemoveFromCart,
    handleAddToCart,
  } = props;
  const navigate = useNavigate()
  return (
    <section className="trending mt-[48px] sm:mt-[80px] pd-carousel flex flex-col gap-[2em] text-center">
      <h2 className="heading-text text-center">
        Best Sellers
      </h2>
      <div className="flex flex-col gap-[2em]">
        <RowCarousel buttonClassName="z-[1]">
          <div data-aos="fade-left" data-aos-once="false">
            <ProductList
              products={products}
              current_currency={current_currency}
              all_currency={all_currency}
              updateWishlist={updateWishlist}
              authenticated={authenticated}
              itemInCart={itemInCart}
              shopFormErrors={shopFormErrors}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </RowCarousel>

        <a
          onClick={() => navigate('/shop')}
        >
          <button className="rounded-[5px] bg-other text-white p-[4px] sm:p-[8px] pl-[8px] pr-[8px] sm:pl-[16px] sm:pr-[16px] text-[14px] sm:text-[16px]">
            VIEW ALL
          </button>
        </a>
      </div>
    </section>
  );
};

export default Trending;
