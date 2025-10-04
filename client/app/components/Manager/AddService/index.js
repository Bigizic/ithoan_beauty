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
import Checkbox from '../../Common/Checkbox';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { DAYS_OF_WEEK } from '../../../containers/Service/constants';
import SelectOption from '../../Common/SelectOption';

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

  const availability = serviceFormData.availability || [];

  const addAvailabilitySlot = () => {
    const newSlot = {
      day: 'Monday',
      timeRanges: [
        {
          startHour: 8,
          startMinute: 0,
          endHour: 17,
          endMinute: 0
        }
      ]
    };
    serviceChange('availability', [...availability, newSlot]);
  };

  const removeAvailabilitySlot = (index) => {
    const updated = availability.filter((_, i) => i !== index);
    serviceChange('availability', updated);
  };

  const updateAvailabilityDay = (index, day) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], day };
    serviceChange('availability', updated);
  };

  const addTimeRange = (dayIndex) => {
    const updated = [...availability];
    updated[dayIndex].timeRanges.push({
      startHour: 8,
      startMinute: 0,
      endHour: 17,
      endMinute: 0
    });
    serviceChange('availability', updated);
  };

  const removeTimeRange = (dayIndex, timeIndex) => {
    const updated = [...availability];
    updated[dayIndex].timeRanges = updated[dayIndex].timeRanges.filter((_, i) => i !== timeIndex);
    serviceChange('availability', updated);
  };

  const updateTimeRange = (dayIndex, timeIndex, field, value) => {
    const updated = [...availability];
    updated[dayIndex].timeRanges[timeIndex][field] = parseInt(value) || 0;
    serviceChange('availability', updated);
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

          <Col xs='12' md='12' className='mb-4'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <label className='mb-0'><strong>Service Availability</strong></label>
              <Button
                type='button'
                text='+ Add Day'
                variant='primary'
                size='sm'
                onClick={addAvailabilitySlot}
              />
            </div>

            {availability.map((dayAvail, dayIndex) => (
              <div key={dayIndex} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9'
              }}>
                <div className='d-flex justify-content-between align-items-start mb-3'>
                  <div style={{ flex: 1, maxWidth: '200px' }}>
                    <label className='mb-1'><strong>Day</strong></label>
                    <select
                      className='form-control'
                      value={dayAvail.day}
                      onChange={(e) => updateAvailabilityDay(dayIndex, e.target.value)}
                    >
                      {DAYS_OF_WEEK.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <Button
                    type='button'
                    text='Remove Day'
                    variant='danger'
                    size='sm'
                    onClick={() => removeAvailabilitySlot(dayIndex)}
                  />
                </div>

                <div>
                  <div className='d-flex justify-content-between align-items-center mb-2'>
                    <label className='mb-0'><strong>Time Ranges</strong></label>
                    <Button
                      type='button'
                      text='+ Add Time Range'
                      variant='secondary'
                      size='sm'
                      onClick={() => addTimeRange(dayIndex)}
                    />
                  </div>

                  {dayAvail.timeRanges && dayAvail.timeRanges.map((timeRange, timeIndex) => (
                    <div key={timeIndex} style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'end',
                      marginBottom: '10px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ flex: '0 0 80px' }}>
                        <label style={{ fontSize: '12px' }}>Start Hour</label>
                        <input
                          type='number'
                          className='form-control'
                          min='0'
                          max='23'
                          value={timeRange.startHour}
                          onChange={(e) => updateTimeRange(dayIndex, timeIndex, 'startHour', e.target.value)}
                        />
                      </div>
                      <div style={{ flex: '0 0 80px' }}>
                        <label style={{ fontSize: '12px' }}>Start Min</label>
                        <input
                          type='number'
                          className='form-control'
                          min='0'
                          max='59'
                          value={timeRange.startMinute}
                          onChange={(e) => updateTimeRange(dayIndex, timeIndex, 'startMinute', e.target.value)}
                        />
                      </div>
                      <div style={{ flex: '0 0 80px' }}>
                        <label style={{ fontSize: '12px' }}>End Hour</label>
                        <input
                          type='number'
                          className='form-control'
                          min='0'
                          max='23'
                          value={timeRange.endHour}
                          onChange={(e) => updateTimeRange(dayIndex, timeIndex, 'endHour', e.target.value)}
                        />
                      </div>
                      <div style={{ flex: '0 0 80px' }}>
                        <label style={{ fontSize: '12px' }}>End Min</label>
                        <input
                          type='number'
                          className='form-control'
                          min='0'
                          max='59'
                          value={timeRange.endMinute}
                          onChange={(e) => updateTimeRange(dayIndex, timeIndex, 'endMinute', e.target.value)}
                        />
                      </div>
                      <div style={{ padding: '0 0 8px 0' }}>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {String(timeRange.startHour).padStart(2, '0')}:{String(timeRange.startMinute).padStart(2, '0')} - {String(timeRange.endHour).padStart(2, '0')}:{String(timeRange.endMinute).padStart(2, '0')}
                        </span>
                      </div>
                      {dayAvail.timeRanges.length > 1 && (
                        <Button
                          type='button'
                          text='×'
                          variant='danger'
                          size='sm'
                          onClick={() => removeTimeRange(dayIndex, timeIndex)}
                          style={{ padding: '2px 10px' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {formErrors['availability'] && (
              <span className='text-danger'>{formErrors['availability']}</span>
            )}
          </Col>

          {/*<Col xs='12' md='12'>
            <Input
              type={'images'}
              error={formErrors['images']}
              name={'images'}
              label={'Images'}
              placeholder={'Select multiple or one'}
              onInputChange={(name, value) => {
                serviceChange(name, value);
              }}
            />
          </Col>*/}

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