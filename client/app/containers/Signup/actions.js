/*
 *
 * Signup actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  SIGNUP_CHANGE,
  SIGNUP_RESET,
  SET_SIGNUP_LOADING,
  SET_SIGNUP_SUBMITTING,
  SUBSCRIBE_CHANGE,
  SET_SIGNUP_FORM_ERRORS
} from './constants';

import { setAuth } from '../Authentication/actions';
import setToken from '../../utils/token';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

export const signupChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SIGNUP_CHANGE,
    payload: formData
  };
};

export const subscribeChange = () => {
  return {
    type: SUBSCRIBE_CHANGE
  };
};

export const googleSignup = (credential) => {
  return async (dispatch, getState) => {
    try {
      const isSubscribed = getState().signup.isSubscribed;
      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
      dispatch({ type: SET_SIGNUP_LOADING, payload: true });


      const user = {
        isSubscribed,
        credential: credential.credential,
        phoneNumber: credential.phoneNumber,
      };

      const response = await axios.post(`${API_URL}/auth/register/google`, user);
      const userid = response.data.user.id

      const sm = getState().currency;
      const default_currency = sm.select_currency.length > 0 ? sm.select_currency : sm.default_currency

      // try and fetch currency of user
      const fetchUserCurrency = await axios.get(`${API_URL}/currency/get_currency/${userid}`)
      if (fetchUserCurrency.status === 200) {
        localStorage.setItem('select_currency', fetchUserCurrency.data.currency[0].currency)
      } else {
        const lSCurrency = localStorage.getItem('select_currency');

        const userCurrency = lSCurrency ? lSCurrency : default_currency[0]
        const currencyResponse = await axios.post(`${API_URL}/currency/add`,
          {
            userId: userid,
            currency: userCurrency
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (currencyResponse.status === 200) {
          localStorage.setItem('select_currency', userCurrency);
        }
      }

      const successfulOptions = {
        title: `You have signed up successfully! You will be receiving an email as well. Thank you!`,
        position: 'tr',
        autoDismiss: 1
      };

      localStorage.setItem('token', response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(successfulOptions));
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      const title = `Please try to signup again!`;
      handleError(error, dispatch, title);
      return;
    } finally {
      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
      dispatch({ type: SET_SIGNUP_LOADING, payload: false });
      return;
    }
  }

}


export const signUp = (default_currency) => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: 'required|email',
        password: 'required|min:6',
        firstName: 'required',
        lastName: 'required',
        phoneNumber: 'required',
      };

      const newUser = getState().signup.signupFormData;
      const isSubscribed = getState().signup.isSubscribed;

      const { isValid, errors } = allFieldsValidation(newUser, rules, {
        'required.email': 'Email is required.',
        'required.password': 'Password is required.',
        'required.firstName': 'First Name is required.',
        'required.lastName': 'Last Name is required.',
        'required.phoneNumber': 'Phone number is required',
      });

      if (!isValid) {
        return dispatch({ type: SET_SIGNUP_FORM_ERRORS, payload: errors });
      }

      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: true });
      dispatch({ type: SET_SIGNUP_LOADING, payload: true });

      const user = {
        isSubscribed,
        ...newUser
      };

      const response = await axios.post(`${API_URL}/auth/register`, user);
      const userid = response.data.user.id


      // try and fetch currency of user
      const fetchUserCurrency = await axios.get(`${API_URL}/currency/get_currency/${userid}`)
      if (fetchUserCurrency.status === 200) {
        localStorage.setItem('select_currency', fetchUserCurrency.data.currency[0].currency)
      } else {
        // if no currency found create currency for user
        // chcek if localStorage.getItem('select_currency) exists
        // if it doesn't use default_currency for user currency

        const lSCurrency = localStorage.getItem('select_currency');

        const userCurrency = lSCurrency ? lSCurrency : default_currency[0]
        const currencyResponse = await axios.post(`${API_URL}/currency/add`,
          {
            userId: userid,
            currency: userCurrency
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (currencyResponse.status === 200) {
          localStorage.setItem('select_currency', userCurrency);
        }
      }

      const successfulOptions = {
        title: `You have signed up successfully! You will be receiving an email as well. Thank you!`,
        position: 'tr',
        autoDismiss: 1
      };

      localStorage.setItem('token', response.data.token);

      setToken(response.data.token);

      dispatch(setAuth());
      dispatch(success(successfulOptions));
      dispatch({ type: SIGNUP_RESET });
    } catch (error) {
      const title = `Please try to signup again!`;
      handleError(error, dispatch, title);
      return;
    } finally {
      dispatch({ type: SET_SIGNUP_SUBMITTING, payload: false });
      dispatch({ type: SET_SIGNUP_LOADING, payload: false });
      return;
    }
  };
};
