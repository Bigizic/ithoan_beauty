import React from "react";

interface Product {
  imageUrl?: string;
}

interface ProductImgResolveProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  product?: Product;
  src?: string;
}

const ProductImgResolve: React.FC<ProductImgResolveProps> = ({
  product,
  src,
  className,
  ...restProps
}) => {
  if (product?.imageUrl) {
    return (
      <img
        className="w-[158px] h-[189px] lg:w-[296px] lg:h-[364.8px] rounded-[10px]"
        alt="product image"
        src={product.imageUrl}
        {...restProps}
      />
    );
  } else {
    return (
      <img
        className={className ? className + " product_img" : "product_img"}
        alt="product placeholder"
        src={src ? src : "upload/images/placeholder.png"}
        {...restProps}
      />
    );
  }
};

export default ProductImgResolve;
