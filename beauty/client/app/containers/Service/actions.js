/*
 *
 * Service actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_ALL_SERVICE,
  FETCH_A_SERVICE,
  SERVICE_CHANGE,
  SERVICE_EDIT_CHANGE,
  SET_SERVICE_FORM_ERRORS,
  SET_SERVICE_FORM_EDIT_ERRORS,
  ADD_SERVICE,
  REMOVE_SERVICE,
  FETCH_SERVICES_SELECT,
  SET_SERVICES_LOADING,
  RESET_SERVICE
} from './constants';

import handleError from '../../utils/error';
import { formatSelectOptions } from '../../utils/select';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

export const serviceChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SERVICE_CHANGE,
    payload: formData
  };
};

export const serviceEditChange = (name, value) => {
  let formData = {};
  formData[name] = value;

  return {
    type: SERVICE_EDIT_CHANGE,
    payload: formData
  };
};

export const resetService = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_SERVICE });
  };
};

export const setServiceLoading = value => {
  return {
    type: SET_SERVICES_LOADING,
    payload: value
  };
};

// fetch services api
export const fetchAllService = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_SERVICES_LOADING, payload: true });

      const response = await axios.get(`${API_URL}/service`);

      dispatch({
        type: FETCH_ALL_SERVICE,
        payload: response.data.services
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_SERVICES_LOADING, payload: false });
    }
  };
};

// fetch service api
export const fetchAService = serviceId => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/service/${serviceId}`);

      dispatch({
        type: FETCH_A_SERVICE,
        payload: response.data.service
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// fetch services select api (for dropdown)
export const fetchServicesSelect = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${API_URL}/services/list/select`);

      const formattedServices = formatSelectOptions(response.data.services, true);

      dispatch({
        type: FETCH_SERVICES_SELECT,
        payload: formattedServices
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

// add service api
export const addService = () => {
  return async (dispatch, getState) => {
    dispatch(setServiceLoading(true))
    try {
      const rules = {
        name: 'required',
        description: 'required|max:5000',
        price: 'required|numeric',
        duration: 'required|numeric'
      };

      const service = getState().service.serviceFormData;

      const { isValid, errors } = allFieldsValidation(service, rules, {
        'required.name': 'Name is required.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 5000 characters.',
        'required.price': 'Price is required.',
        'numeric.price': 'Price must be a number.',
        'required.duration': 'Duration is required.',
        'numeric.duration': 'Duration must be a number.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SERVICE_FORM_ERRORS, payload: errors });
      }

      const formData = new FormData();
      for (const key in service) {
        if (service.hasOwnProperty(key)) {
          if (key === 'images' && service[key] && service[key].length > 0) {
            for (let i = 0; i < service[key].newFiles.length; i++) {
              formData.append('images', service[key].newFiles[i].file || service[key].newFiles[i]);
            }
          } else if (key === 'availability') {
            formData.set(key, JSON.stringify(service[key] || []));
          } else {
            formData.set(key, service[key]);
          }
        }
      }

      const response = await axios.post(`${API_URL}/service/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: ADD_SERVICE,
          payload: response.data.service
        });
        dispatch({ type: RESET_SERVICE });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServiceLoading(false))
    }
  };
};

// update service api
export const updateService = () => {
  return async (dispatch, getState) => {
    dispatch(setServiceLoading(true))
    try {
      const rules = {
        name: 'required',
        slug: 'required|alpha_dash',
        description: 'required|max:5000',
        price: 'required|numeric',
        duration: 'required|numeric'
      };

      const service = getState().service.service;

      const newService = {
        name: service.name,
        slug: service.slug,
        description: service.description,
        price: service.price,
        duration: service.duration,
        discount: service.discount,
        isActive: service.isActive,
        availability: service.availability,
        //images: service.images
      };


      const { isValid, errors } = allFieldsValidation(newService, rules, {
        'required.name': 'Name is required.',
        'required.slug': 'Slug is required.',
        'alpha_dash.slug': 'Slug may have alpha-numeric characters, as well as dashes and underscores only.',
        'required.description': 'Description is required.',
        'max.description': 'Description may not be greater than 5000 characters.',
        'required.price': 'Price is required.',
        'numeric.price': 'Price must be a number.',
        'required.duration': 'Duration is required.',
        'numeric.duration': 'Duration must be a number.'
      });

      if (!isValid) {
        return dispatch({ type: SET_SERVICE_FORM_EDIT_ERRORS, payload: errors });
      }

      const formData = new FormData();
      for (const key in newService) {
        if (newService.hasOwnProperty(key)) {
          if (key === 'images' && newService[key] && newService[key].length > 0) {
            // Handle new image files
            if (newService[key].newFiles) {
              for (let i = 0; i < newService[key].newFiles.length; i++) {
                formData.append('images', newService[key].newFiles[i].file || newService[key].newFiles[i]);
              }
            }
            // Keep existing images
            if (newService[key].existingImages) {
              formData.set('existingImages', JSON.stringify(newService[key].existingImages));
            }
          } else if (key === 'availability') {
            formData.set(key, JSON.stringify(newService[key] || []));
          } else {
            formData.set(key, newService[key]);
          }
        }
      }

      const response = await axios.put(`${API_URL}/service/${service._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServiceLoading(false))
    }
  };
};

// delete service api
export const deleteService = (id) => {
  return async (dispatch, getState) => {
    dispatch(setServiceLoading(true))
    try {
      const response = await axios.delete(`${API_URL}/service/delete/${id}`);

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      if (response.data.success === true) {
        dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_SERVICE,
          payload: id
        });
        dispatch(goBack());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setServiceLoading(false))
    }
  };
};