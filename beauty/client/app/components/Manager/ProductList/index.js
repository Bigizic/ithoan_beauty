/**
 *
 * ProductList
 *
 */

import React, { useState, useMemo } from 'react';

import { Link } from 'react-router-dom';
import DescriptionComponent from '../../../utils/description';

const ProductList = props => {
  const { products, productBoughtCount } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(product => {
      const name = product.name?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      const sku = product.sku?.toLowerCase() || '';

      return name.includes(query) || description.includes(query) || sku.includes(query);
    });
  }, [products, searchQuery]);

  return (
    <div className='p-list'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '3em' }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', background: 'lightgreen', padding: '10px 10px', borderRadius: '5px' }}>
            {productBoughtCount} Product Sold
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <input
              type="text"
              placeholder="Search products by name, description, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
        {searchQuery && (
          <div style={{ fontSize: '14px', color: '#666' }}>
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
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
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
          No products found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default ProductList;
