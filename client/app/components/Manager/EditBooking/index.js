/**
 *
 * Edit Booking
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import SelectOption from '../../Common/SelectOption';

const EditBooking = props => {
  const { booking, formErrors, bookingChange, updateBooking } = props;

  const handleSubmit = event => {
    event.preventDefault();
    updateBooking();
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className='edit-booking'>
      <form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              error={formErrors['fullName']}
              label={'Full Name'}
              name={'fullName'}
              placeholder={'Full Name'}
              value={booking.fullName}
              onInputChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'email'}
              error={formErrors['email']}
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
              value={booking.email}
              onInputChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              error={formErrors['phoneNumber']}
              label={'Phone Number'}
              name={'phoneNumber'}
              placeholder={'Phone Number'}
              value={booking.phoneNumber}
              onInputChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <SelectOption
              error={formErrors['status']}
              label={'Status'}
              name={'status'}
              value={booking.status}
              options={statusOptions}
              handleSelectChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'date'}
              error={formErrors['bookingDate']}
              label={'Booking Date'}
              name={'bookingDate'}
              value={booking.bookingDate ? new Date(booking.bookingDate).toISOString().split('T')[0] : ''}
              onInputChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='6'>
            <Input
              type={'text'}
              error={formErrors['bookingTime']}
              label={'Booking Time'}
              name={'bookingTime'}
              placeholder={'e.g., 2:00 PM'}
              value={booking.bookingTime}
              onInputChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              type={'textarea'}
              error={formErrors['note']}
              label={'Note (Optional)'}
              name={'note'}
              placeholder={'Additional notes...'}
              value={booking.note}
              onInputChange={(name, value) => {
                bookingChange(name, value);
              }}
            />
          </Col>
        </Row>
        <hr />
        <div className='booking-info-section mb-4'>
          <h5>Service Information</h5>
          <p className='text-muted'>
            To change the service or sub-service, please update the serviceId and subServiceId fields.
            Contact support if you need assistance with service changes.
          </p>
        </div>
        <div className='d-flex flex-column flex-md-row'>
          <Button
            type='submit'
            text='Update Booking'
            className='mb-3 mb-md-0 mr-0 mr-md-3'
          />
        </div>
      </form>
    </div>
  );
};

export default EditBooking;
