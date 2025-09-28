/**
 *
 * EditServices
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Switch from '../../Common/Switch';
import SelectOption from '../../Common/SelectOption';
import LoadingIndicator from '../../Common/LoadingIndicator';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Description Box Component
 */
const DescriptionBox = (props) => {
  const { error, servicesChange, servicesItem } = props;

  return (
    <div style={{ margin: '10px 0px 80px 0px' }}>
      <label>Description:</label>
      <ReactQuill
        theme="snow"
        style={{ height: '200px', marginTop: "10px" }}
        value={servicesItem.description}
        name={'description'}
        onChange={(value) => {
          servicesChange('description', value)
        }}
        placeholder="Enter services description..."
      />
      <span style={{color: 'red'}} className='invalid-message'>{error && error[0]}</span>
    </div>
  );
};

const EditServices = props => {
  const {
    servicesItem,
    servicesChange,
    formErrors,
    updateServices,
    deleteServices,
    services,
    isLoading
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateServices();
  };

  return (
    <div className='edit-services'>
      {isLoading && <LoadingIndicator />}
      <div className='d-flex flex-row mx-0 mb-3'>
        <label className='mr-1'>Services link </label>
        <Link to={`/services/${servicesItem.slug}`} className='default-link'>
          {servicesItem.slug}
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
              placeholder={'Services Name'}
              value={servicesItem.name}
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' className='p-0 m-0'>
            <Input
              type={'text'}
              error={formErrors['slug']}
              label={'Slug'}
              name={'slug'}
              placeholder={'Services Slug'}
              value={servicesItem.slug}
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' className='p-0 m-0'>
            <Input
              type={'text'}
              error={formErrors['title']}
              label={'Title'}
              name={'title'}
              placeholder={'Services Title'}
              value={servicesItem.title}
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6' className='p-0 m-0'>
            <DescriptionBox
              error={formErrors['description']}
              servicesChange={servicesChange}
             servicesItem={servicesItem}
            />
          </Col>

          <Col xs='12' md='12'>
            <Input
              type={'images'}
              error={formErrors['images']}
              name={'images'}
              label={'Services Images (Multiple)'}
              placeholder={'Upload Services Images'}
              value={servicesItem.imageUrl} // Pass existing images
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['serviceArray']}
              label={'Select Services'}
              multi={true}
              defaultValue={servicesItem.serviceArray}
              options={services}
              handleSelectChange={value => {
                servicesChange('serviceArray', value);
              }}
            />
          </Col>

          <Col xs='12' md='12' className='mt-3 mb-2 p-0'>
            <Switch
              id={`enable-services-${servicesItem._id}`}
              name={'isActive'}
              label={'Active?'}
              checked={servicesItem?.isActive}
              toggleCheckboxChange={value => {
                servicesChange('isActive', value);
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
            onClick={() => deleteServices(servicesItem._id)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditServices;