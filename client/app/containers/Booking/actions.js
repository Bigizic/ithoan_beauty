import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_BOOKINGS,
  FETCH_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  SET_BOOKINGS_LOADING,
  CLEAR_BOOKINGS,
  SET_BOOKING_FORM_DATA,
  CLEAR_BOOKING_FORM_DATA
} from './constants';

import handleError from '../../utils/error';
import { API_URL } from '../../constants';

export const setBookingLoading = value => {
  return {
    type: SET_BOOKINGS_LOADING,
    payload: value
  };
};

export const fetchBookings = (page = 1, status = 'all', search = '') => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBookingLoading(true));

      const response = await axios.get(`${API_URL}/booking/list`, {
        params: {
          page,
          limit: 20,
          status,
          search
        }
      });

      const { bookings, totalPages, currentPage, totalBookings } = response.data;

      dispatch({
        type: FETCH_BOOKINGS,
        payload: {
          bookings,
          totalPages,
          currentPage,
          totalBookings
        }
      });
    } catch (error) {
      dispatch(clearBookings());
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const fetchBooking = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBookingLoading(true));

      const response = await axios.get(`${API_URL}/booking/${id}`);

      dispatch({
        type: FETCH_BOOKING,
        payload: response.data.booking
      });

      dispatch({
        type: SET_BOOKING_FORM_DATA,
        payload: response.data.booking
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const updateBooking = (id, bookingData, navigate) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBookingLoading(true));
      const response = await axios.put(`${API_URL}/booking/${id}`, bookingData);

      dispatch({
        type: UPDATE_BOOKING,
        payload: response.data.booking
      });

      const successfulOptions = {
        title: 'Booking updated successfully',
        position: 'tr',
        autoDismiss: 2
      };

      dispatch(success(successfulOptions));

      if (navigate) {
        navigate('/dashboard/booking');
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const deleteBooking = (id, navigate) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setBookingLoading(true));

      const response = await axios.delete(`${API_URL}/booking/${id}`);

      dispatch({
        type: DELETE_BOOKING,
        payload: id
      });

      const successfulOptions = {
        title: 'Booking deleted successfully',
        position: 'tr',
        autoDismiss: 2
      };

      dispatch(success(successfulOptions));

      if (navigate) {
        navigate('/dashboard/booking');
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setBookingLoading(false));
    }
  };
};

export const setBookingFormData = (field, value) => {
  return {
    type: SET_BOOKING_FORM_DATA,
    payload: { [field]: value }
  };
};

export const clearBookingFormData = () => {
  return {
    type: CLEAR_BOOKING_FORM_DATA
  };
};

export const clearBookings = () => {
  return {
    type: CLEAR_BOOKINGS
  };
};

export const fetchServiceCategoriesSelect = (serviceId) => {
  return async(dispatch) => {
    try {

    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
