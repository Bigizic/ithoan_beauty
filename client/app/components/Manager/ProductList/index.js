/**
 *
 * ProductList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const ProductList = props => {
  const { products, productBoughtCount } = props;

  return (
    <div className='p-list'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '3em' }}>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ textAlign: 'center', background: 'lightgreen', padding: '10px 10px', borderRadius: '5px' }}>{productBoughtCount} Product Sold</div>
        </div>

      </div>
      {products.map((product, index) => (
        <Link
          to={`/dashboard/product/edit/${product._id}`}
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
        >
          <img
            className='item-image'
            src={`${product && product.imageUrl
                ? product.imageUrl
                : '/images/placeholder-image.png'
              }`}
          />
          <div style={{ maxHeight: '100px', marginLeft: '10px', overflow: 'hidden' }} className='d-flex flex-column justify-content-center px-3 text-truncate'>
            <h4 className='text-truncate'>{product.name}</h4>
            <div className='descript_trunicate mb-2 text-truncate'><DescriptionComponent content={product.description} /></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
