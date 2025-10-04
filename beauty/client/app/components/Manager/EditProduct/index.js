/**
 *
 * EditProduct
 *
 */

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

import LoadingIndicator from '../../Common/LoadingIndicator';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];


/**
 * 
 * @returns 
 */

const DescriptionBox = (props) => {
  const { error, productChange, productFormData } = props;

  return (
    <div style={{ margin: '10px 0px 80px 0px' }}>
      <label>Description:</label>
      <ReactQuill
        theme="snow"
        style={{ height: '200px', marginTop: "10px" }}
        value={productFormData.description}
        name={'description'}
        onChange={(value) => {
          productChange('description', value)
        }}
        placeholder="Enter product description..."
      />
      <span style={{color: 'red'}} className='invalid-message'>{error && error[0]}</span>
      </div>
  );
};


/**
 * 
 * @param {*} props 
 * @returns 
 */

const ProductPricing = (props) => {
  const { productFormData, productChange, formErrors } = props;  
  const [finalPrice, setFinalPrice] = useState(null);
  const v = productFormData.price - (productFormData.price * (productFormData.discountPrice / 100))
  const [newValue, setProductDiscountValue] = useState(v)

  // Function to calculate the final price dynamically
  const calculateFinalPrice = (price, discount) => {
    if (price && discount) {
      const d = ((price - discount) / price) * 100;
      return d; // Calculate and format price
    }
    return null; // Return null if values are missing
  };

  return (
    <>
      {/* Product Price Input */}
      <Col xs='12' lg='6' className='p-0 m-0'>
        <Input
          type={'number'}
          error={formErrors['price']}
          label={'Price'}
          name={'price'}
          min={1}
          placeholder={'Product Price'}
          value={productFormData.price}
          onInputChange={(name, value) => {
            productChange(name, value);
            const updatedFinalPrice = calculateFinalPrice(value, productFormData.discountPrice); // Recalculate final price
            setFinalPrice(updatedFinalPrice); // Update final price
          }}
        />
      </Col>

      {/* Discount Price Input */}
      <Col xs='12' lg='6' className='p-0 m-0'>
        <Input
          type={'number'}
          error={formErrors['discountPrice']}
          label={'Discount Price'}
          name={'discountPrice'}
          decimals={true}
          value={newValue}
          placeholder={'Discount Percentage'}
          onInputChange={(name, value) => {
            let d = 0
            if (value && d <= productFormData.price) {
              d = ((productFormData.price - value) / productFormData.price) * 100;
            }
            setProductDiscountValue(value)
            productChange(name, d);
            const updatedFinalPrice = calculateFinalPrice(productFormData.price, value); // Recalculate final price
            setFinalPrice(updatedFinalPrice); // Update final price
          }}
        />
        {/* Display Final Price */}
        <p>
          {finalPrice !== null
            ? `You're giving ${(finalPrice).toFixed(2)}% off`
            : 'Enter price and discount to calculate final price.'}
        </p>
      </Col>
    </>
  );
};


const EditProduct = props => {
  const {
    user,
    product,
    productChange,
    formErrors,
    brands,
    updateProduct,
    deleteProduct,
    activateProduct,

    isLoading,
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateProduct();
  };

  return (
    <div className='edit-product'>
      { isLoading && <LoadingIndicator />  }
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Product link </label>
        <Link to={`/product/${product.slug}`} className='default-link'>
          {product.slug}
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' className='p-0 m-0'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={product.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' className='p-0 m-0'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Product Sku'}
              value={product.sku}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' className='p-0 m-0'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Product Slug'}
              value={product.slug}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <DescriptionBox
              error={formErrors['description']}
              productChange={productChange}
              productFormData={product}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <Input
              className="quantity_temp_today"
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={product.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>


          <ProductPricing
            productFormData={product}
            productChange={productChange}
            formErrors={formErrors}
          />

          <Col xs='12' md='12' className='p-0 m-0'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              multi={false}
              name={'taxable'}
              value={[product.taxable ? taxableSelect[0] : taxableSelect[1]]}
              options={taxableSelect}
              handleSelectChange={value => {
                productChange('taxable', value.value);
              }}
            />
          </Col>


          {/*user.role === ROLES.Admin && (
            <Col xs='12' md='12'>
              <SelectOption
                error={formErrors['brand']}
                label={'Select Brand'}
                multi={false}
                value={product.brand}
                options={brands}
                handleSelectChange={value => {
                  productChange('brand', value);
                }}
              />
            </Col>
          )*/}


          <Col xs='12' md='12' className='mt-3 mb-2 p-0'>
            <Switch
              id={`enable-product-${product._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={product?.isActive}
              toggleCheckboxChange={value => {
                productChange('isActive', value);
                activateProduct(product._id, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Save'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
          <Button
            variant='danger'
            text='Delete'
            onClick={() => deleteProduct(product._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
