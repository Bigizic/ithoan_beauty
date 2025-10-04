/**
 *
 * Banner
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';
import { XIcon } from '../../Common/Icon';

const BannerList = props => {
  const { banners, updateBannerlist, deleteBanner } = props;

  const getProductImage = item => {
    if (item) {
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img
            className='item-image'
            src={`${
              item.imageUrl
                ? item.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
        </div>
      );
    }
  };

  return (
    <div className='w-list'>
      {banners.map((item, index) => (
        <div
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 banner-box'
        >
          <div className='img-container'>
            {getProductImage(item)}
            <div className='remove-wishlist-box'>
            <Button
              variant='danger'
              icon={<XIcon className='text-white' width={12} />}
              round={20}
              onClick={e => {
                deleteBanner(item._id);
              }}
            />
            </div>
          </div>
            <div className='d-flex flex-column justify-content-center px-3 banner-text-div'>
              <label className='banner-text'>{`Banner Added on ${formatDate(
                item.created
              )}`}</label>
              {item.isDefault ?
                <Switch
                  id={`isdefault-active-${item._id}`}
                  name={'isDefault'}
                  label={'Default?'}
                  checked={true}
                  toggleCheckboxChange={value => updateBannerlist(item._id, { isDefault:  value })}
                />
                :
                <Switch
                  id={`isdefault-not-active-${item._id}`}
                  name={'isDefault'}
                  label={'Default?'}
                  checked={false}
                  toggleCheckboxChange={value => updateBannerlist(item._id, { isDefault:  value })}
                />
              }

              {item.isActive ?
                <Switch
                id={`isactive-active-${item._id}`}
                  name={'isActive'}
                  label={'Active?'}
                  checked={true}
                  toggleCheckboxChange={value => updateBannerlist(item._id, { isActive: value })}
                />
                :
                <Switch
                id={`isactive-not-active-${item._id}`}
                  name={'isActive'}
                  label={'Active?'}
                  checked={false}
                  toggleCheckboxChange={value => updateBannerlist(item._id, { isActive: value })}
                />
              }
            </div>
        </div>
      ))}
    </div>
  );
};

export default BannerList;
