/**
 *
 * Add Banner
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import LoadingIndicator from '../../Common/LoadingIndicator';


const AddBanner = props => {
  const {
    bannerFormData,
    formErrors,
    addBanner,
    bannerChange,
    image,
    isLoading
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addBanner();
  };

  return (
    <div className='add-product'>
      { isLoading && <LoadingIndicator /> }
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' md='12'>
            <Input
              type={'image'}
              error={formErrors.image}
              name={'image'}
              label={'Upload Image'}
              placeholder={'Please Upload Image'}
              onInputChange={(name, value) => {
                bannerChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'banner-active'}
              name={'isActive'}
              label={'Active?'}
              checked={bannerFormData.isActive}
              toggleCheckboxChange={value => bannerChange('isActive', value)}
            />
          </Col>
          <p   style={{ margin: '2% 1% 0% 2%', border: '1px solid #dfdfdf', padding: '2px 5px' }}>
            Setting default to "ON" would make your selected image the first banner on the homepage</p>
          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'banner-default'}
              name={'isDefault'}
              label={'Default?'}
              checked={bannerFormData.isDefault}
              toggleCheckboxChange={value => bannerChange('isDefault', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Add Banner' />
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
