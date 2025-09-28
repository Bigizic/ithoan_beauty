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
import LoadingIndicator from '../../Common/LoadingIndicator';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const optionsSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
]


/**
 * 
 * @returns 
 */

const DescriptionBox = (props) => {
  const { error, campaignChange, campaignFormData, isLoading } = props;

  return (
    <div style={{ margin: '10px 0px 50px 0px' }}>
      <label>Sub Heading</label>
      <ReactQuill
        theme="snow"
        style={{ height: '200px' }}
        value={campaignFormData.subHeading}
        name={'subHeading'}
        onChange={(value) => {
          campaignChange('subHeading', value)
        }}
        placeholder="Enter sub heading.."
      />
      <span style={{color: 'red'}} className='invalid-message'>{error && error[0]}</span>
      </div>
  );
};


const AddCampaign = props => {
  const {
    user,
    campaignFormData,
    formErrors,
    campaignChange,
    addCampaign,
    image,
    isLoading,
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addCampaign();
  };

  return (
    <div className='add-product'>
      { isLoading && <LoadingIndicator /> }
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['heading']}
              label={'Heading'}
              name={'heading'}
              placeholder={'Heading'}
              value={campaignFormData.heading}
              onInputChange={(name, value) => {
                campaignChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
          <DescriptionBox
            error={formErrors['subHeading']}
            campaignChange={campaignChange}
            campaignFormData={campaignFormData}
          />
          </Col>

          {/*<Col style={{ marginTop: '20px' }} xs='12' md='12'>
            <SelectOption
              error={formErrors['footer']}
              label={'Include Footer'}
              name={'isFooterIncluded'}
              options={optionsSelect}
              value={campaignFormData.footer}
              handleSelectChange={value => {
                campaignChange('footer', value);
              }}
            />
          </Col>*/}

          <Col style={{ marginTop: '20px' }} xs='12' md='12'>
            <SelectOption
              error={formErrors['links']}
              label={'Include Links'}
              name={'isLinksIncluded'}
              options={optionsSelect}
              value={campaignFormData.links}
              handleSelectChange={value => {
                campaignChange('links', value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['image']}
              name={'image'}
              label={'Campaign Image'}
              placeholder={'Upload Campaign Image'}
              value={image}
              onInputChange={(name, value) => {
                campaignChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['isBestSellingSelected']}
              label={'Include Best Selling Products'}
              name={'isBestSellingSelected'}
              options={optionsSelect}
              value={campaignFormData.isBestSellingSelected}
              handleSelectChange={value => {
                campaignChange('isBestSellingSelected', value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['isDiscountedSelected']}
              label={'Include Discounted Products'}
              name={'isDiscountedSelected'}
              options={optionsSelect}
              value={campaignFormData.isDiscountedSelected}
              handleSelectChange={value => {
                campaignChange('isDiscountedSelected', value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['isNewArrivalsSelected']}
              label={'Include New Arrivals'}
              name={'isNewArrivalsSelected'}
              options={optionsSelect}
              value={campaignFormData.isNewArrivalsSelected}
              handleSelectChange={value => {
                campaignChange('isNewArrivalsSelected', value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-product-actions'>
          <Button type='submit' text='Save Campaign' />
        </div>
      </form>
    </div>
  );
};

export default AddCampaign;
