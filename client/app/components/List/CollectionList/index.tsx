'use client'

import React from "react";
import HyperLink from "../../Store/Tags/Link";
import ProductImgResolve from "@/components/Store/utils/productImgResolve";
import Input from "@/components/Store/Tags/Input";
import { CURRENCY } from "@/constants";

interface CollectionListProps {
  collections: any[];
  showImage?: boolean;
  current_currency: any
  all_currency: any
}

const CollectionList = ({ collections, showImage, current_currency, all_currency }: CollectionListProps) => {
  if (showImage) {
    return (
      <div className="flex justify-start gap-6 z-20 w-full bg-white">
        {collections?.map((collection, index) => (
          <div key={index} className="flex flex-col items-start w-[158px] lg:w-[296px]">
            <HyperLink
              className="block"
              type="product"
              to={`shop/category/${collection.categorySlug}`}
            >
              <ProductImgResolve product={collection.product} />
            </HyperLink>

            <HyperLink
              to={`/collection/${collection.categorySlug}`}
              className="text-xs sm:text-[17px] mt-[1em] w-full overflow-hidden text-left gap-[10px] flex flex-col"
            >
              <Input type="stars" lock={true} value={5} />
              <p className="overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>{collection.categoryName}</p>
              {/**
               * <p dangerouslySetInnerHTML={{ __html: collection.products[0].description }}
                className="overflow-hidden text-ellipsis line-clamp-3"
              >
               */}
               <p className="overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>{collection.product.name}</p>
              <p>{all_currency[current_currency]} {collection.product.price.toLocaleString()}</p>
            </HyperLink>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="
        flex justify-center sm:justify-start gap-8 
        z-20 w-full bg-white
        px-8 py-2 sm:px-6 sm:pt-3 sm:pb-2
      "
    >
      {collections?.map((collection, index) => (
        <div key={index} className="flex items-center">
          <HyperLink
            text={collection.name}
            to={`/category/${collection.slug}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
