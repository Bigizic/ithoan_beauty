/*
 *
 * Account actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  CLEAR_ACCOUNT,
  SET_PROFILE_LOADING,

  CREATE_BANK,
  FETCH_BANK,
  RESET_BANK,
  DELETE_BANK,

  SET_BANK_FORM_ERROR,
  RESET_BANK_FORM_ERROR,
} from './constants';
import handleError from '../../utils/error';
import { API_URL } from '../../constants';
import { allFieldsValidation } from '../../utils/validation';
import { setAuth } from '../Authentication/actions';


export const resetBanks = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_BANK });
  };
}


export const accountChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: ACCOUNT_CHANGE,
    payload: formData
  };
};

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT
  };
};

export const setProfileLoading = value => {
  return {
    type: SET_PROFILE_LOADING,
    payload: value
  };
};

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setProfileLoading(true));
      const response = await axios.get(`${API_URL}/user/me`, { withCredentials: true });

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });
      //dispatch(setAuth())
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setProfileLoading(false));
    }
  };
};

export const updateProfile = () => {
  return async (dispatch, getState) => {
    const profile = getState().account.user;

    try {
      const response = await axios.put(`${API_URL}/user`, {
        profile
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch({ type: FETCH_PROFILE, payload: response.data.user });

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetches admin bank
export const fetchBanks = () => {
  return async(dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/admin_account_bank`)
      if (response.data.success) {
        dispatch({
          type: FETCH_BANK,
          payload: response.data.banks
        })
      }
    } catch (error) {
      handleError(error, dispatch)
    }

  }
}


// creates admin bank
export const createBank = (selectedBank, accountNumber, accountName) => {
  return async(dispatch, getState) => {
    try {
      const rules = {
        bankName: 'required',
        accountNumber: 'required|max:20',
        nameOnAccount: 'required',
      };

      const newBank = {
        bankName: selectedBank,
        accountNumber: accountNumber,
        nameOnAccount: accountName,
      };

      const { isValid, errors } = allFieldsValidation(newBank, rules, {
        'required.bankName': 'Bank name is required.',
        'required.accountNumber': 'Account number is required.',
        'max.accountNumber':
          'Account Number may not be greater than 20 characters.',
        'required.nameOnAccount': 'Account name is required.',
      });

      if (!isValid) {
        return dispatch({ type: SET_BANK_FORM_ERROR, payload: errors });
      }

      const response = await axios.post(`${API_URL}/admin_account_bank/create`, newBank, {
        headers: { 'Content-Type': 'application/json' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: CREATE_BANK,
          payload: response.data.bank
        });
        dispatch(resetBanks());
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}


// delete a bank
export const deleteBank = (id) => {
  return async(dispatch, getState) => {
    try {
      if (id) {
        const response  = await axios.delete(`${API_URL}/admin_account_bank/delete/${id}`)
        if (response.data.success) {
          const successfulOptions = {
            title: `${response.data.message}`,
            position: 'tr',
            autoDismiss: 1
          };

          dispatch({
            type: DELETE_BANK,
            payload: id
          })
          dispatch(success(successfulOptions));
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  }
}
