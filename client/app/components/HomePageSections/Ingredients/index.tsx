import React from 'react';
import HyperLink from '../../Store/Tags/Link';
import ProductList from '../../List/ProductList';
import RowCarousel from '../../Store/Others/RowCarousel';
import ProductImgResolve from '../../Store/utils/productImgResolve';
import Button from '../../Store/Tags/Button';

interface Product {
  _id: string;
  count: number;
  name: string;
  imageUrl?: string;
}

interface Collection {
  _id: string;
  name: string;
  slug: string;
  products: string[];
}

interface ShopCollectionProps {
  collection: Collection[];
  mostBoughtProducts: Product[];
}

const ShopCollection: React.FC<ShopCollectionProps> = (props) => {
  let { collection, mostBoughtProducts } = props;
  if (!collection || collection.length === 0) return null;

  const sortedProducts = mostBoughtProducts.sort((a, b) => b.count - a.count);
  let mostBoughtCollection = collection?.filter(c => c.name !== 'All' && c.products.includes(sortedProducts[0]?._id))[0];
  
  if (!mostBoughtCollection) return null;

  const mostBoughtCollectionProducts = sortedProducts
    .filter(p => mostBoughtCollection?.products.includes(p._id))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className='shop_a_collection'>
      <div className='collection_image p-[1em] md:p-[0]' data-aos="fade-right">
        <HyperLink type={"product"} to={`/category/${mostBoughtCollection.slug}`}>
          <video autoPlay muted playsInline loop src='/upload/skincare_video_1.mp4'>
            video not supported by browser
          </video>
        </HyperLink>

        <div className='collection_details font-black'>
          <p className='text-[3em] font-italiano text-white'>{mostBoughtCollection.name}</p>
          <p className='text-[2em] font-italiano text-white'>Shop Our Most Bought Collection</p>
          <HyperLink text={"Shop Now"} to={`/category/${mostBoughtCollection.slug}`} />
        </div>
      </div>

      <div className='shop_a_collection_products'>
        <RowCarousel buttonClassName={"carousel-buttons-2-z-index"}>
          <ProductList products={mostBoughtCollectionProducts} />
        </RowCarousel>
      </div>
    </div>
  );
}

export default ShopCollection;