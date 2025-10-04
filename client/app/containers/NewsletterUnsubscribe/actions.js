/**
 * Newsletter unsubscribe actions
*/

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  SET_NEWSLETTER_UNSUBSCRIBE_EMAIL,
  SET_NEWSLETTER_UNSUBSCRIBE_FORM_ERRORS,
  NEWSLETTER_UNSUBSCRIBE_RESET,
  SET_NEWSLETTER_UNSUBSCRIBE_LOADING,
} from './constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import { push } from 'connected-react-router';


export const newsletterUnsubscribeChange = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: SET_NEWSLETTER_UNSUBSCRIBE_EMAIL,
      payload: value
    });
  };
};

export const newsletterUnsubscribeReset = () => {
  return (dispatch) => {
    dispatch({
      type: NEWSLETTER_UNSUBSCRIBE_RESET
    });
  };
};

export const setNewsletterUnsubscribeLoading = (value) => {
    return (dispatch) => {
        dispatch({
            type: SET_NEWSLETTER_UNSUBSCRIBE_LOADING,
            payload: value
        })
    }
}

export const unsubscribeToNewsletter = () => {
  return async (dispatch, getState) => {
    dispatch(setNewsletterUnsubscribeLoading(true))
    try {
      const rules = {
        email: 'required|email'
      };

      const user = {};
      user.email = getState().newsletterUnsubscribe.email;

      const { isValid, errors } = allFieldsValidation(user, rules, {
        'required.email': 'Email is required.',
        'email.email': 'Email format is invalid.'
      });

      if (!isValid) {
        return dispatch({ type: SET_NEWSLETTER_UNSUBSCRIBE_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`${API_URL}/newsletter/unsubscribe/${user.email}`);
      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 6
      };
      dispatch(newsletterUnsubscribeReset());
      dispatch(success(successfulOptions));
      return dispatch(push(`/`))
    } catch (error) {
      dispatch(push('/'));
      return handleError(error, dispatch);
    } finally {
      return dispatch(setNewsletterUnsubscribeLoading(false))
    }
  };
};
