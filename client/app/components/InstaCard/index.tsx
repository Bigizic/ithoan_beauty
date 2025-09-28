'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import RowCarousel from "../Store/Others/RowCarousel"
import './style.css';
import instaProductsData from './index.json'
import ProductImgResolve from '../Store/utils/productImgResolve'

const instaUrl = 'https://www.instagram.com/'

type InstaProduct = {
  title: string
  embed: string
  imageUrl: string
}

type Product = {
  name: string
  imageUrl: string
  slug: string
}

type MatchedProduct = {
  name: string
  slug: string
  imageUrl: string
  instaImage: string
}

function findMatchingProducts(
  instaProducts: InstaProduct[],
  products: Product[]
): MatchedProduct[] {
  return instaProducts
    .map(insta => {
      const match = products.find(
        p => p.name.toLowerCase().trim() === insta.title.toLowerCase().trim()
      )
      return match
        ? {
            ...match,
            instaImage: insta.embed || insta.imageUrl
          }
        : null
    })
    .filter((x): x is MatchedProduct => x !== null)
}

function Shimmer({ className }: { className: string }) {
  return <div className={`shimmer ${className}`} />
}

function SingleProductCard({ product }: { product: MatchedProduct }) {
  const [loadedEmbed, setLoadedEmbed] = useState(false)
  const [loadedThumb, setLoadedThumb] = useState(false)

  return (
    <div
      className="insta-card w-[18em] h-[fit-content]"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      data-aos-once="true"
    >
      {/* Media */}
      <div className="media w-full h-[18em]">
        {!loadedEmbed && <Shimmer className="media-shimmer" />}
        <ProductImgResolve
          src={product.instaImage}
          alt={product.name}
          width={360}
          height={360}
          onLoad={() => setLoadedEmbed(true)}
          style={{ objectFit: 'cover' }}
        />
        <span className="ig-badge" aria-hidden="true">
          <Instagram size={18} />
        </span>
      </div>

      <Link
        className="product-chip"
        href={'/product/' + product.slug}
        aria-label={`Shop ${product.name}`}
      >
        {!loadedThumb && <Shimmer className="thumb-shimmer" />}
        <ProductImgResolve
          className="thumb"
          src={product.imageUrl}
          alt={product.name}
          width={56}
          height={56}
          onLoad={() => setLoadedThumb(true)}
          style={{ objectFit: 'cover' }}
        />

        <div className="meta w-full overflow-hidden">
          <div className="name">
            {product.name ? product.name : <Shimmer className="text-shimmer" />}
          </div>
          <div className="cta">Tap to Shop</div>
        </div>
      </Link>
    </div>
  )
}

interface InstagramCardProps {
  products: Product[]
  brandHandle?: string
}

export default function InstagramCard({ products, brandHandle }: InstagramCardProps) {
  const readyProducts = findMatchingProducts(instaProductsData.instaProducts, products)

  return (
    <div className="mb-[2em]">
      {brandHandle && (
        <div>
          <h2 className="text-xl">Connect with us</h2>
          <div className="brand-row">
            <Instagram size={16} />
            <span className="brand-name">
              @ <a target="_blank" href={instaUrl + brandHandle}>{brandHandle}</a>
            </span>
          </div>
        </div>
      )}

      <RowCarousel buttonClassName="carousel-buttons-2-z-index">
        {readyProducts.map((p, idx) => (
          <SingleProductCard key={idx} product={p} />
        ))}
      </RowCarousel>
    </div>
  )
}
