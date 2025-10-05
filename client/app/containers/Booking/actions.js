/*
 *
 * Booking actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_BOOKINGS,
  FETCH_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  SET_BOOKING_LOADING,
  SET_BOOKING_FILTERS,
  CLEAR_BOOKINGS,
  BOOKING_FORM_CHANGE,
  BOOKING_FORM_RESET,
  SET_BOOKING_FORM_ERRORS
} from './constants';

import handleError from '../../utils/error';
import { API_URL } from '../../constants';
import { allFieldsValidation } from '../../utils/validation';

export const setBookingLoading = value => {
  return {
    type: SET_BOOKING_LOADING,
    payload: value
  };
};

export const bookingFormChange = (name, value) => {
  return {
    type: BOOKING_FORM_CHANGE,
    payload: { name, value }
  };
};

export const resetBookingForm = () => {
  return {
    type: BOOKING_FORM_RESET
  };
};

export const setBookingFormErrors = errors => {
  return {
    type: SET_BOOKING_FORM_ERRORS,
    payload: errors
  };
};

export const clearBookings = () => {
  return {
    type: CLEAR_BOOKINGS
  };
};

export const fetchBookings = (page = 1, status = '', search = '') => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBookingLoading(true));

      const params = {
        page: page ?? 1,
        limit: 20
      };

      if (status && status !== 'all') {
        params.status = status;
      }

      if (search) {
        params.search = search;
      }

      const response = await axios.get(`${API_URL}/booking/list`, { params });

      const { bookings, totalPages, currentPage, totalBookings } = response.data;

      dispatch({
        type: FETCH_BOOKINGS,
        payload: bookings
      });

      dispatch({
        type: SET_BOOKING_FILTERS,
        payload: { totalPages, currentPage, totalBookings }
      });
    } catch (error) {
      dispatch(clearBookings());
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const fetchBooking = id => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBookingLoading(true));

      const response = await axios.get(`${API_URL}/booking/${id}`);

      dispatch({
        type: FETCH_BOOKING,
        payload: response.data.booking
      });

      return response.data.booking;
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const updateBooking = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        fullName: 'required',
        email: 'required|email',
        phoneNumber: 'required|min:10'
      };

      const booking = getState().booking.bookingFormData;

      const { isValid, errors } = allFieldsValidation(booking, rules, {
        'required.fullName': 'Full name is required.',
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.',
        'required.phoneNumber': 'Phone number is required.',
        'min.phoneNumber': 'Phone number must be at least 10 characters.'
      });

      if (!isValid) {
        return dispatch(setBookingFormErrors(errors));
      }

      dispatch(setBookingLoading(true));

      const updateData = {
        fullName: booking.fullName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        status: booking.status,
        note: booking.note
      };

      if (booking.serviceId) {
        updateData.serviceId = booking.serviceId;
      }

      if (booking.subServiceId) {
        updateData.subServiceId = booking.subServiceId;
      }

      if (booking.bookingDate) {
        updateData.bookingDate = booking.bookingDate;
      }

      if (booking.bookingTime) {
        updateData.bookingTime = booking.bookingTime;
      }

      const response = await axios.put(
        `${API_URL}/booking/${booking._id}`,
        updateData
      );

      dispatch(success({
        title: 'Success',
        message: 'Booking updated successfully!',
        position: 'tr',
        autoDismiss: 3
      }));

      dispatch({
        type: UPDATE_BOOKING,
        payload: response.data.booking
      });

      dispatch(push('/dashboard/booking'));
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const deleteBooking = id => {
  return async (dispatch, getState) => {
    try {
      if (!window.confirm('Are you sure you want to delete this booking?')) {
        return;
      }

      dispatch(setBookingLoading(true));

      await axios.delete(`${API_URL}/booking/${id}`);

      dispatch(success({
        title: 'Success',
        message: 'Booking deleted successfully!',
        position: 'tr',
        autoDismiss: 3
      }));

      dispatch({
        type: DELETE_BOOKING,
        payload: id
      });

      dispatch(fetchBookings());
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};
