/*
 *
 * Edit
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import actions from '../../actions';

import EditBooking from '../../components/Manager/EditBooking';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Edit extends React.PureComponent {
  componentDidMount() {
    const bookingId = this.props.match.params.id;
    this.props.fetchBooking(bookingId);
  }

  componentWillUnmount() {
    this.props.resetBookingForm();
  }

  render() {
    const {
      booking,
      bookingFormData,
      formErrors,
      isLoading,
      bookingFormChange,
      updateBooking
    } = this.props;

    return (
      <SubPage
        title='Edit Booking'
        actionTitle=''
        handleAction={() => {}}
      >
        {isLoading ? (
          <LoadingIndicator inline />
        ) : booking ? (
          <EditBooking
            booking={bookingFormData}
            formErrors={formErrors}
            bookingChange={bookingFormChange}
            updateBooking={updateBooking}
          />
        ) : (
          <NotFound message='Booking not found.' />
        )}
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    booking: state.booking.booking,
    bookingFormData: state.booking.bookingFormData,
    formErrors: state.booking.formErrors,
    isLoading: state.booking.isLoading
  };
};

const EditWithRouter = props => {
  const match = { params: useParams() };
  return <Edit {...props} match={match} />;
};

export default connect(mapStateToProps, actions)(EditWithRouter);
