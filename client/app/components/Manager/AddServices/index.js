/**
 *
 * AddServices
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Switch from '../../Common/Switch';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';
import LoadingIndicator from '../../Common/LoadingIndicator';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * Description Box Component
 */
const DescriptionBox = (props) => {
  const { error, servicesChange, servicesFormData } = props;

  return (
    <div style={{ margin: '10px 0px 80px 0px' }}>
      <label>Description:</label>
      <ReactQuill
        theme="snow"
        style={{ height: '200px', marginTop: "10px" }}
        value={servicesFormData.description}
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

const AddServices = props => {
  const {
    servicesFormData,
    formErrors,
    servicesChange,
    addServices,
    services,
    isLoading
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
    addServices();
  };

  return (
    <div className='add-services'>
      {isLoading && <LoadingIndicator />}
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['name']}
              label={'Services Name'}
              name={'name'}
              placeholder={'Services Category Name'}
              value={servicesFormData.name}
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
            <Input
              type={'text'}
              error={formErrors['title']}
              label={'Title'}
              name={'title'}
              placeholder={'Services Title'}
              value={servicesFormData.title}
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' lg='6'>
            <DescriptionBox
              error={formErrors['description']}
              servicesChange={servicesChange}
              servicesFormData={servicesFormData}
            />
          </Col>

          <Col xs='12' md='12'>
            <SelectOption
              error={formErrors['serviceArray']}
              label={'Select Services'}
              multi={true}
              value={servicesFormData.serviceArray}
              options={services}
              handleSelectChange={value => {
                servicesChange('serviceArray', value);
              }}
            />
          </Col>

          <Col xs='12' md='12'>
            <Input
              type={'images'}
              error={formErrors['images']}
              name={'images'}
              label={'Services Images (Multiple)'}
              placeholder={'Upload Services Images'}
              onInputChange={(name, value) => {
                servicesChange(name, value);
              }}
            />
          </Col>

          <Col xs='12' md='12' className='my-2'>
            <Switch
              id={'active-services'}
              name={'isActive'}
              label={'Active?'}
              checked={servicesFormData.isActive}
              toggleCheckboxChange={value => servicesChange('isActive', value)}
            />
          </Col>
        </Row>
        <hr />
        <div className='add-services-actions'>
          <Button type='submit' text='Add Services' />
        </div>
      </form>
    </div>
  );
};

export default AddServices;