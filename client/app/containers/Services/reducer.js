/*
 *
 * Services reducer
 *
 */

import {
  FETCH_SERVICES_LIST,
  FETCH_SERVICES_ITEM,
  SERVICES_CHANGE,
  SERVICES_EDIT_CHANGE,
  SET_SERVICES_FORM_ERRORS,
  SET_SERVICES_FORM_EDIT_ERRORS,
  ADD_SERVICES,
  REMOVE_SERVICES,
  FETCH_SERVICES_SELECT,
  RESET_SERVICES,
  SET_SERVICES_LIST_LOADING
} from './constants';

const initialState = {
  servicesList: [],
  servicesItem: {
    name: '',
    title: '',
    description: '',
    serviceArray: []
  },
  servicesSelect: [],
  servicesFormData: {
    name: '',
    title: '',
    title: '',
    description: '',
    serviceArray: [],
    images: [],
    isActive: true
  },
  formErrors: {},
  editFormErrors: {},
  isLoading: false
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES_LIST:
      return {
        ...state,
        servicesList: action.payload
      };
    case FETCH_SERVICES_ITEM:
      return {
        ...state,
        servicesItem: action.payload,
        editFormErrors: {}
      };
    case FETCH_SERVICES_SELECT:
      return {
        ...state,
        servicesSelect: action.payload
      };
    case ADD_SERVICES:
      return {
        ...state,
        servicesList: [...state.servicesList, action.payload]
      };
    case REMOVE_SERVICES:
      const index = state.servicesList.findIndex(s => s._id === action.payload);
      return {
        ...state,
        servicesList: [
          ...state.servicesList.slice(0, index),
          ...state.servicesList.slice(index + 1)
        ]
      };
    case SERVICES_CHANGE:
      return {
        ...state,
        servicesFormData: {
          ...state.servicesFormData,
          ...action.payload
        }
      };
    case SERVICES_EDIT_CHANGE:
      return {
        ...state,
        servicesItem: {
          ...state.servicesItem,
          ...action.payload
        }
      };
    case SET_SERVICES_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case SET_SERVICES_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload
      };
    case SET_SERVICES_LIST_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case RESET_SERVICES:
      return {
        ...state,
        servicesFormData: {
          name: '',
          title: '',
          title: '',
          description: '',
          serviceArray: [],
          images: [],
          isActive: true
        },
        servicesItem: {
          name: '',
          title: '',
          description: '',
          serviceArray: []
        },
        servicesItem: {
          name: '',
          title: '',
          description: '',
          serviceArray: []
        },
        formErrors: {}
      };
    default:
      return state;
  }
};

export default servicesReducer;