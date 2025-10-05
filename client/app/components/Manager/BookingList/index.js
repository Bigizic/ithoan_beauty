import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/date';

const BookingList = props => {
  const { bookings, onDelete, onRefresh } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = e => {
    e.preventDefault();
    onRefresh(1, statusFilter, searchTerm);
  };

  const handleStatusFilter = status => {
    setStatusFilter(status);
    onRefresh(1, status, searchTerm);
  };

  const getStatusBadge = status => {
    const statusColors = {
      pending: 'warning',
      confirmed: 'info',
      completed: 'success',
      cancelled: 'danger'
    };
    return statusColors[status] || 'secondary';
  };

  const formatTime = time => {
    return time || 'N/A';
  };

  return (
    <div className='booking-list'>
      <div className='booking-filter-bar mb-4'>
        <div className='row'>
          <div className='col-md-6 mb-3'>
            <form onSubmit={handleSearch}>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by booking number, name, or email...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button className='btn btn-primary' type='submit'>
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className='col-md-6 mb-3'>
            <div className='btn-group' role='group'>
              <button
                type='button'
                className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleStatusFilter('all')}
              >
                All
              </button>
              <button
                type='button'
                className={`btn ${statusFilter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleStatusFilter('pending')}
              >
                Pending
              </button>
              <button
                type='button'
                className={`btn ${statusFilter === 'confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleStatusFilter('confirmed')}
              >
                Confirmed
              </button>
              <button
                type='button'
                className={`btn ${statusFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleStatusFilter('completed')}
              >
                Completed
              </button>
              <button
                type='button'
                className={`btn ${statusFilter === 'cancelled' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleStatusFilter('cancelled')}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='booking-items'>
        {bookings.map((booking, index) => (
          <div className='booking-box mb-3' key={index}>
            <div className='card'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-8'>
                    <h5 className='card-title'>
                      <span className='badge bg-secondary me-2'>#{booking.bookingHash}</span>
                      {booking.customerInfo?.fullName}
                    </h5>
                    <div className='booking-details'>
                      <p className='mb-1'>
                        <strong>Service:</strong> {booking.serviceId?.name || 'N/A'} - {booking.subServiceId?.name || \'N/A'}
                      </p>
                      <p className='mb-1'>
                        <strong>Email:</strong> {booking.customerInfo?.email}
                      </p>
                      <p className='mb-1'>
                        <strong>Phone:</strong> {booking.customerInfo?.phoneNumber}
                      </p>
                      <p className='mb-1'>
                        <strong>Date:</strong> {formatDate(booking.bookingDate)}
                      </p>
                      <p className='mb-1'>
                        <strong>Time:</strong> {formatTime(booking.bookingTime)}
                      </p>
                      <p className='mb-1'>
                        <strong>Amount:</strong> ₦{booking.totalAmount?.toLocaleString()}
                      </p>
                      <p className='mb-1'>
                        <strong>Payment:</strong>{' '}
                        <span className={`badge bg-${booking.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
                          {booking.paymentStatus}
                        </span>
                      </p>
                      {booking.note && (
                        <p className='mb-1'>
                          <strong>Note:</strong> {booking.note}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='col-md-4 text-md-end'>
                    <div className='mb-3'>
                      <span className={`badge bg-${getStatusBadge(booking.status)} fs-6`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className='booking-actions d-flex flex-column gap-2'>
                      <Link
                        to={`/dashboard/booking/edit/${booking._id}`}
                        className='btn btn-sm btn-primary'
                      >
                        Edit
                      </Link>
                      <button
                        className='btn btn-sm btn-danger'
                        onClick={() => onDelete(booking._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className='mt-2'>
                      <small className='text-muted'>
                        Created: {formatDate(booking.created)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
