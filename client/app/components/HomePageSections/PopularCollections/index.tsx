import React from "react";
import CollectionList from "@/components/List/CollectionList";
import RowCarousel from "../../Store/Others/RowCarousel";
import HyperLink from "@/components/Store/Tags/Link";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  imageUrl?: string;
}

interface Collection {
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  product: Product[];
}

interface CollectionWithProducts extends Omit<Collection, 'products'> {
  products: Product[];
}

interface PopularCollectionsProps {
  collections: Collection[]
  current_currency: any
  all_currency: any
}

const PopularCollections: React.FC<PopularCollectionsProps> = (props) => {
  const navigate = useNavigate()
  const { collections, current_currency, all_currency } = props;
  if (!collections || collections.length === 0) return null;
  const newCollection = collections.filter(i => i.categoryName !== 'All')

  return (
    <div className="popular_collections pd-carousel mt-[48px] sm:mt-[80px] text-center flex flex-col gap-[2em]">
      <h2 className="heading-text heading-inherit-text">Discover our latest Collections</h2>
      <RowCarousel>
        <div data-aos="fade-left" data-aos-once="false">
          <CollectionList
            showImage={true}
            collections={newCollection}
            current_currency={current_currency}
            all_currency={all_currency}
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
  );
};

export default PopularCollections;