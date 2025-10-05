/*
 *
 * List
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import BookingList from '../../components/Manager/BookingList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBookings();
  }

  componentWillUnmount() {
    this.props.clearBookings();
  }

  render() {
    const {
      bookings,
      isLoading,
      fetchBookings,
      deleteBooking
    } = this.props;

    return (
      <div className='order-dashboard'>
        <SubPage
          title='Bookings'
          actionTitle=''
          handleAction={() => {}}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : bookings.length > 0 ? (
            <BookingList
              bookings={bookings}
              onDelete={deleteBooking}
              onRefresh={fetchBookings}
            />
          ) : (
            <NotFound message='No bookings found.' />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookings: state.booking.bookings,
    isLoading: state.booking.isLoading
  };
};

export default connect(mapStateToProps, actions)(List);
