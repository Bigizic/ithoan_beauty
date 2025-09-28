/*
 *
 * Service reducer
 *
 */

import {
  FETCH_SERVICES,
  FETCH_SERVICE,
  SERVICE_CHANGE,
  SERVICE_EDIT_CHANGE,
  SET_SERVICE_FORM_ERRORS,
  SET_SERVICE_FORM_EDIT_ERRORS,
  ADD_SERVICE,
  REMOVE_SERVICE,
  FETCH_SERVICES_SELECT,
  RESET_SERVICE,
  SET_SERVICES_LOADING
} from './constants';

const initialState = {
  services: [],
  service: {
    name: '',
    description: '',
    price: 0,
    duration: 0,
    discount: 0
  },
  servicesSelect: [],
  serviceFormData: {
    name: '',
    description: '',
    price: 0,
    duration: 0,
    discount: 0,
    isActive: true,
    isDiscounted: false
  },
  formErrors: {},
  editFormErrors: {},
  isLoading: false
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      return {
        ...state,
        services: action.payload
      };
    case FETCH_SERVICE:
      return {
        ...state,
        service: action.payload,
        editFormErrors: {}
      };
    case FETCH_SERVICES_SELECT:
      return {
        ...state,
        servicesSelect: action.payload
      };
    case ADD_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload]
      };
    case REMOVE_SERVICE:
      const index = state.services.findIndex(s => s._id === action.payload);
      return {
        ...state,
        services: [
          ...state.services.slice(0, index),
          ...state.services.slice(index + 1)
        ]
      };
    case SERVICE_CHANGE:
      return {
        ...state,
        serviceFormData: {
          ...state.serviceFormData,
          ...action.payload
        }
      };
    case SERVICE_EDIT_CHANGE:
      return {
        ...state,
        service: {
          ...state.service,
          ...action.payload
        }
      };
    case SET_SERVICE_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_SERVICE_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_SERVICES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_SERVICE:
      return {
        ...state,
        serviceFormData: {
          name: '',
          description: '',
          price: 0,
          duration: 0,
          discount: 0,
          isActive: true,
          isDiscounted: false
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default serviceReducer;