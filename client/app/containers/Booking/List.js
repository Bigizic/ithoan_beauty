import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import actions from '../../actions';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import Button from '@/components/Common/Button';

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      status: 'all',
      currentPage: 1,
      showModal: false,
      selectedBookingId: null
    };
  }

  componentDidMount() {
    this.props.fetchBookings(1, 'all', '');
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = () => {
    const { search, status } = this.state;
    this.props.fetchBookings(1, status, search);
    this.setState({ currentPage: 1 });
  };

  handleStatusFilter = (status) => {
    this.setState({ status, currentPage: 1 });
    this.props.fetchBookings(1, status, this.state.search);
  };

  handlePageChange = (page) => {
    const { status, search } = this.state;
    this.setState({ currentPage: page });
    this.props.fetchBookings(page, status, search);
  };

  handleEdit = (bookingId) => {
    this.props.navigate(`/dashboard/booking/edit/${bookingId}`);
  };

  handleDelete = (bookingId) => {
    this.setState({ showModal: true, selectedBookingId: bookingId });
  };

  confirmDelete = () => {
    const { selectedBookingId } = this.state;
    if (selectedBookingId) {
      this.props.deleteBooking(selectedBookingId);
      this.setState({ showModal: false, selectedBookingId: null });
    }
  };

  cancelDelete = () => {
    this.setState({ showModal: false, selectedBookingId: null });
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  getStatusBadgeClass = (status) => {
    switch (status) {
      case 'unpaid':
        return 'badge-danger';
      case 'confirmed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'completed':
        return 'badge-info';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  render() {
    const { bookings, isLoading, totalPages, totalBookings } = this.props;
    const { search, status, currentPage, showModal } = this.state;

    return (
      <div className='booking-dashboard relative'>
        <SubPage title='Bookings' />
        <div className='booking-filter-bar flex flex-col gap-5'>
          <div className='search-box flex flex-row w-full gap-5'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by booking number, name, or email...'
              value={search}
              onChange={this.handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && this.handleSearch()}
            />
            <Button className='btn' onClick={this.handleSearch} text='Search' />
          </div>

          <div>
            <p className='text-lg pb-2'>Filter booking by status</p>
            <div className='status-filter flex w-full flex-wrap gap-3'>
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
                <Button
                  key={s}
                  spanClassName={`btn ${status === s ? 'text-other' : ''}`}
                  onClick={() => this.handleStatusFilter(s)}
                  text={s.charAt(0).toUpperCase() + s.slice(1)}
                />
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <LoadingIndicator inline />
        ) : bookings.length > 0 ? (
          <>
            <div className='booking-stats my-3'>
              <p>Total Bookings: {totalBookings}</p>
            </div>

            <div className='booking-list'>
              {/* desktop table view */}
              <div className='hidden md:block overflow-x-scroll'>
                <table className='table table-striped w-full'>
                  <thead>
                    <tr>
                      <th>Booking #</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, idx) => (
                      <tr
                        key={idx}
                        className='cursor-pointer'
                        onClick={() => this.handleEdit(booking._id)}
                      >
                        <td>#{booking.bookingHash}</td>
                        <td>
                          <div>{booking.customerInfo.fullName}</div>
                          <small className='text-muted'>{booking.customerInfo.email}</small>
                        </td>
                        <td>
                          {booking.serviceId?.name} - {booking.subServiceId?.name}
                        </td>
                        <td>
                          <div>{this.formatDate(booking.bookingDate)}</div>
                          <small>{booking.bookingTime}</small>
                        </td>
                        <td>₦{booking.totalAmount?.toLocaleString()}</td>
                        <td>
                          <span
                            className={`badge ${booking.paymentStatus === 'paid'
                              ? 'badge-success'
                              : 'badge-warning'
                              }`}
                          >
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${this.getStatusBadgeClass(booking.status)}`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <Button
                            className='btn btn-sm mr-2'
                            onClick={(e) => {
                              e.stopPropagation();
                              this.handleEdit(booking._id);
                            }}
                            text='Edit'
                          />
                          <Button
                            className='btn btn-sm'
                            onClick={(e) => {
                              e.stopPropagation();
                              this.handleDelete(booking._id);
                            }}
                            text='Delete'
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* mobile card view */}
              <div className='block md:hidden space-y-4'>
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className='bg-white rounded-lg shadow p-4 border cursor-pointer'
                    onClick={() => this.handleEdit(booking._id)}
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <p className='font-semibold text-sm'>#{booking.bookingHash}</p>
                      <span
                        className={`badge ${this.getStatusBadgeClass(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className='mb-1'>
                      <p className='font-medium text-sm'>
                        {booking.customerInfo.fullName}
                      </p>
                      <p className='text-xs text-gray-500'>{booking.customerInfo.email}</p>
                    </div>

                    <div className='text-sm mb-1'>
                      <p>{booking.serviceId?.name} - {booking.subServiceId?.name}</p>
                    </div>

                    <div className='text-sm mb-1'>
                      <p>{this.formatDate(booking.bookingDate)}</p>
                      <p className='text-xs text-gray-500'>{booking.bookingTime}</p>
                    </div>

                    <div className='flex justify-between items-center mt-2'>
                      <p className='text-sm font-semibold'>₦{booking.totalAmount?.toLocaleString()}</p>
                      <span
                        className={`badge ${booking.paymentStatus === 'paid'
                          ? 'badge-success'
                          : 'badge-warning'
                          }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>

                    <div className='flex justify-end gap-2 mt-3'>
                      <Button
                        className='btn btn-sm'
                        onClick={(e) => {
                          e.stopPropagation();
                          this.handleEdit(booking._id);
                        }}
                        text='Edit'
                      />
                      <Button
                        className='btn btn-sm'
                        onClick={(e) => {
                          e.stopPropagation();
                          this.handleDelete(booking._id);
                        }}
                        text='Delete'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {totalPages > 1 && (
              <div className='pagination-wrapper'>
                <nav>
                  <ul className='pagination'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                      >
                        <Button
                          className='page-link'
                          onClick={() => this.handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className='mt-5'>
            <NotFound message='No bookings found.' />
          </div>
        )}

        {showModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md text-center'>
              <p className='text-lg mb-4'>are you sure you want to delete this booking?</p>
              <div className='flex justify-center gap-4'>
                <Button className='btn' onClick={this.confirmDelete} text='yes, delete' />
                <Button className='btn' onClick={this.cancelDelete} text='cancel' />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bookings: state.booking.bookings,
  isLoading: state.booking.isLoading,
  totalPages: state.booking.totalPages,
  totalBookings: state.booking.totalBookings
});

const ListWithNavigate = (props) => {
  const navigate = useNavigate();
  return <List {...props} navigate={navigate} />;
};

export default connect(mapStateToProps, actions)(ListWithNavigate);
