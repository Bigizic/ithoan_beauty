import React from 'react'

interface Product {
  price: number
  discountPrice?: number
}

interface ResolvePriceProps {
  product: Product
  all_currency: Record<string, string>
  current_currency: string
}

export const ResolvePrice: React.FC<ResolvePriceProps> = ({ product, all_currency, current_currency }) => {
  const currencySymbol = all_currency[current_currency] || ''

  if (product.discountPrice && product.discountPrice > 0) {
    return (
      <p className="flex items-center gap-2">
        <span style={{ fontFamily: 'sans-serif', color: '#000000' }}>
          {currencySymbol}{ (product.price - (product.price * (product.discountPrice / 100))).toLocaleString()}
        </span>
        <span
          style={{
            fontFamily: 'sans-serif',
            color: '#0000006E',
            textDecoration: 'line-through',
          }}
          className="text-signature"
        >
          {currencySymbol}{product.price.toLocaleString()}
        </span>
      </p>
    )
  }

  return (
    <p>
      <span style={{ fontFamily: 'sans-serif', color: '#000000' }}>
        {currencySymbol}{product.price.toLocaleString()}
      </span>
    </p>
  )
}
