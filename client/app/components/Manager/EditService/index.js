/**
 *
 * EditService
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';
import LoadingIndicator from '../../Common/LoadingIndicator';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Description Box Component
 */
const DescriptionBox = (props) => {
  const { error, serviceChange, service } = props;

  return (
    <div style={{ margin: '10px 0px 80px 0px' }}>
      <label>Description:</label>
      <ReactQuill
        theme="snow"
        style={{ height: '200px', marginTop: "10px" }}
        value={service.description}
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

const EditService = props => {
  const {
    service,
    serviceChange,
    formErrors,
    updateService,
    deleteService,
    isLoading
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateService();
  };

  return (
    <div className='edit-service'>
      {isLoading && <LoadingIndicator />}
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Service link </label>
        <Link to={`/service/${service.slug}`} className='default-link'>
          {service.slug}
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
              placeholder={'Service Name'}
              value={service.name}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' className='p-0 m-0'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Service Slug'}
              value={service.slug}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <DescriptionBox
              error={formErrors['description']}
              serviceChange={serviceChange}
              service={service}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <Input
              type={'images'}
              error={formErrors['images']}
              name={'images'}
              label={'Service Images (Multiple)'}
              placeholder={'Upload Service Images'}
              value={service.imageUrl} // Pass existing images
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <Input
              type={'number'}
              error={formErrors['price']}
              label={'Price'}
              name={'price'}
              min={1}
              placeholder={'Service Price'}
              value={service.price}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <Input
              type={'number'}
              error={formErrors['duration']}
              label={'Duration (minutes)'}
              name={'duration'}
              min={1}
              placeholder={'Service Duration in Minutes'}
              value={service.duration}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <Input
              type={'number'}
              error={formErrors['discount']}
              label={'Discount (%)'}
              name={'discount'}
              min={0}
              max={100}
              placeholder={'Discount Percentage'}
              value={service.discount}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12' className='mt-3 mb-2 p-0'>
            <Switch
              id={`enable-service-${service._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={service?.isActive}
              toggleCheckboxChange={value => {
                serviceChange('isActive', value);
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
            onClick={() => deleteService(service._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditService;