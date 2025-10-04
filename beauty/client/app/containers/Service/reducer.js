/*
 *
 * Service reducer
 *
 */

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
  RESET_SERVICE,
  SET_SERVICES_LOADING
} from './constants';

const initialState = {
  all_service: [],
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
    images: [],
    isActive: true,
  },
  formErrors: {},
  editFormErrors: {},
  isLoading: false
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SERVICE:
      return {
        ...state,
        all_service: action.payload
      };
    case FETCH_A_SERVICE:
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
        services: [...state.all_service, action.payload]
      };
    case REMOVE_SERVICE:
      const index = state.all_service.findIndex(s => s._id === action.payload);
      return {
        ...state,
        services: [
          ...state.all_service.slice(0, index),
          ...state.all_service.slice(index + 1)
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
          images: [],
          isActive: true,
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default serviceReducer;