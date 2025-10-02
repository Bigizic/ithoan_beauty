'use client'

import React from 'react'
import HyperLink from '@/components/Store/Tags/Link'
import Dev from '../../Store/Icons/Dev/index.jsx'
import {
  SnapchatIcon,
  WhatsappIcon,
} from '../../Store/Icons/Socials/index.jsx'
import { LuInstagram } from "react-icons/lu";
import { Mail, Phone, MapPin } from 'lucide-react'
import { INSTAGRAM_LINK, SNAPCHAT_LINK, STORE_NAME, WHATSAPP_URL } from '../../../constants/index.js'
import Image from 'next/image'
import Newsletter from '@/containers/Newsletter/index.js'
import ProductImgResolve from '@/components/Store/utils/productImgResolve'

export default function Footer() {
  return (
    <footer className='w-full flex flex-col bg-black text-white pd-default'>
      {/* newsletter header */}
      <div className='w-full flex flex-col items-center text-center py-8'>
        <h2 className='heading-text text-white'>
          Stay Connected With <span className='text-signature'>Tohanniees</span>
        </h2>
        <p className='text-xs sm:text-base mt-2 text-white'>
          join our community for timeless skincare tips and new arrivals
        </p>
        <div className='mt-4 w-full flex justify-center overflow-hidden'>
          <Newsletter />
        </div>
      </div>

      {/* footer body */}
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12'>
        {/* logo + description + socials */}
        <div className='col-span-1 md:col-span-2'>
          <div className='flex flex-row items-center gap-[.25em]'>
            <ProductImgResolve
              src={'/skincare.png'}
              alt='logo'
              width={100}
              height={100}
              className='h-[40px] w-[48px]'
            />
            <h3 className='text-lg font-semibold text-white m-0'>{STORE_NAME}</h3>
          </div>
          <p className='text-sm mt-3 text-white'>
            Discover elegant skincare crafted with clean ingredients, delivering timeless radiance, gentle nourishment and confidence every day.
          </p>
          <div className='flex gap-4 mt-4 text-white items-center'>
            <HyperLink to={INSTAGRAM_LINK} text={<LuInstagram size={24} />} />
            <HyperLink to={WHATSAPP_URL} text={<WhatsappIcon />} />
            <HyperLink to={SNAPCHAT_LINK} text={<SnapchatIcon />} />
          </div>
        </div>

        {/* company links */}
        <div>
          <h4 className='font-semibold mb-3 text-white'>Company</h4>
          <ul className='space-y-2 text-sm text-white'>
            <li><HyperLink to='/about' text={'About Us'} /></li>
            {/*<li><HyperLink to='/' text={'Our Ingredients'} /></li>*/}
            {/*<li><HyperLink to='/' text={'Sustainability'} /></li>
            <li><HyperLink to='/' text={'blog & tips'} /></li>*/}
            <li><HyperLink to='/faq' text={"FAQs"} /></li>
          </ul>
        </div>

        {/* products */}
        <div>
          <h4 className='font-semibold mb-3 text-white'>Products</h4>
          <ul className='space-y-2 text-sm text-white'>
            <li><HyperLink to='/product/face-cleanser' text={'Cleansers'} /></li>
            <li><HyperLink to='/product/vitamin-c-face-serum-30ml' text={'Serums'} /></li>
            <li><HyperLink to='/shop/category/kit' text={'Skincare Kits'} /></li>
            <li><HyperLink to='/product/sunscreen' text={'Sunscreens'} /></li>
          </ul>
        </div>

        {/* solutions */}
        <div>
          <h4 className='font-semibold mb-3 text-white'>Solutions</h4>
          <ul className='space-y-2 text-sm text-white'>
            <li><HyperLink to='/' text={'Anti-aging Care'} /></li>
            <li><HyperLink to='/product/hydrating-face-toner' text={'Hydration & Glow'} /></li>
            <li><HyperLink to='/' text={'Sensitive Skin Relief'} /></li>
            <li><HyperLink to='/product/sunburn-kit' text={'Sunburn Oils'} /></li>
          </ul>
        </div>

        {/* contact info */}
        <div className='w-[fit-content]'>
          <h4 className='font-semibold mb-3 text-white'>Contact Information</h4>
          <ul className='space-y-3 text-sm text-white'>
            <li className='flex items-center gap-2'><Phone size={16} />+234 907 769 2506</li>
            <li className='flex items-center gap-2'><MapPin size={16} />Ikorodu, Badore, Ajah, Lagos State</li>
            <li className='flex items-center gap-2'><Mail size={16} />support@tohannieesskincare.com</li>
          </ul>
        </div>
      </div>

      {/* copyright + developer */}
      <div className='px-8 pb-6 text-center border-t border-white border-top-one'>
        <p className='text-xs sm:text-sm mt-4 text-white'>
          &copy; {new Date().getFullYear()} {STORE_NAME}. all rights reserved.
        </p>
        <div className='flex justify-center mt-3 text-white'>
          <Dev />
        </div>
      </div>
    </footer>
  )
}