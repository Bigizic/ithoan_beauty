/**
 *
 * AddProduct
 *
 */

import React, {useState} from 'react';

import { Row, Col } from 'reactstrap';

import { ROLES } from '../../../constants';
import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingIndicator from '../../Common/LoadingIndicator';

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
 * @param {object} props 
 * @returns 
 */

const ProductPricing = (props) => {
  const { productFormData, productChange, formErrors } = props;  
  const [finalPrice, setFinalPrice] = useState(null);

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
      <Col xs='12' lg='6'>
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
      <Col xs='12' lg='6'>
        <Input
          type={'number'}
          error={formErrors['discountPrice']}
          label={'Discount Price'}
          name={'discountPrice'}
          decimals={true}
          value={productFormData.discountPrice > 0 ? (Math.round(productFormData.price - (productFormData.price * (productFormData.discountPrice / 100) ))) : ''}
          placeholder={'Discount Percentage'}
          onInputChange={(name, value) => {
            let d = 0;
            if (value) {
              d = ((productFormData.price - value) / productFormData.price) * 100;
            }
            productFormData.discountPrice = d
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


const AddProduct = props => {
  const {
    user,
    productFormData,
    formErrors,
    productChange,
    addProduct,
    brands,
    image,

    isLoading
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addProduct();
  };

  return (
    <div className='add-product'>
      { isLoading &&  <LoadingIndicator /> }
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['sku']}
              label={'Sku'}
              name={'sku'}
              placeholder={'Product Sku'}
              value={productFormData.sku}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Product Name'}
              value={productFormData.name}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
          <DescriptionBox
            error={formErrors['description']}
            productChange={productChange}
            productFormData={productFormData}
          />
          </Col>


          <Col xs='12' lg='6'>
            <Input
              className="quantity_temp_today"
              type={'number'}
              error={formErrors['quantity']}
              label={'Quantity'}
              name={'quantity'}
              decimals={false}
              placeholder={'Product Quantity'}
              value={productFormData.quantity}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>

          <ProductPricing
            productFormData={productFormData}
            productChange={productChange}
            formErrors={formErrors}
          />

          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['taxable']}
              label={'Taxable'}
              name={'taxable'}
              options={taxableSelect}
              value={productFormData.taxable}
              handleSelectChange={value => {
                productChange('taxable', value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <Input
              type={'images'}
              error={formErrors['images']}
              name={'images'}
              label={'Images'}
              placeholder={'Select multiple or one'}
              onInputChange={(name, value) => {
                productChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-product'}
              name={'isActive'}
              label={'Active?'}
              checked={productFormData.isActive}
              toggleCheckboxChange={value => productChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Add Product' />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
