/**
 *
 * AddService
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import LoadingIndicator from '../../Common/LoadingIndicator';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Description Box Component
 */
const DescriptionBox = (props) => {
  const { error, serviceChange, serviceFormData } = props;

  return (
    <div style={{ margin: '10px 0px 80px 0px' }}>
      <label>Description:</label>
      <ReactQuill
        theme="snow"
        style={{ height: '200px', marginTop: "10px" }}
        value={serviceFormData.description}
        name={'description'}
        onChange={(value) => {
          serviceChange('description', value)
        }}
        placeholder="Enter service description..."
      />
      <span style={{color: 'red'}} className='invalid-message'>{error && error[0]}</span>
    </div>
  );
};

const AddService = props => {
  const {
    serviceFormData,
    formErrors,
    serviceChange,
    addService,
    isLoading
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addService();
  };

  return (
    <div className='add-service'>
      {isLoading && <LoadingIndicator />}
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Name'}
              name={'name'}
              placeholder={'Service Name'}
              value={serviceFormData.name}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Service Price'}
              value={serviceFormData.price}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['duration']}
              label={'Duration (minutes)'}
              name={'duration'}
              min={1}
              placeholder={'Service Duration in Minutes'}
              value={serviceFormData.duration}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
            <Input
              type={'number'}
              error={formErrors['discount']}
              label={'Discount (%)'}
              name={'discount'}
              min={0}
              max={100}
              placeholder={'Discount Percentage'}
              value={serviceFormData.discount}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
            <DescriptionBox
              error={formErrors['description']}
              serviceChange={serviceChange}
              serviceFormData={serviceFormData}
            />
          </Col>

          <Col xs='12' md='12'>
            <Input
              type={'file'}
              error={formErrors['images']}
              name={'images'}
              label={'Service Images (Multiple)'}
              placeholder={'Upload Service Images'}
              multiple
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-service'}
              name={'isActive'}
              label={'Active?'}
              checked={serviceFormData.isActive}
              toggleCheckboxChange={value => serviceChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-service-actions'>
          <Button type='submit' text='Add Service' />
        </div>
      </form>
    </div>
  );
};

export default AddService;