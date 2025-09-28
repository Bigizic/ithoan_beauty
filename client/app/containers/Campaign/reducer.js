/*
 *
 * Product reducer
 *
 */



import {
  FETCH_ALL_CAMPAIGNS,
  FETCH_CAMPAIGN,
  CREATE_CAMPAIGN,
  RESET_CAMPAIGNS,
  SET_CAMPAIGN_LOADING,
  REMOVE_CAMPAIGN,
  SET_CAMPAIGN_FORM_ERRORS,
  ADD_CAMPAIGNS,
  CAMPAIGN_CHANGE,
  FETCH_MAILING_LIST_DETAILS,
} from './constants';

const initialState = {
  campaigns: [],
  campaign: {},
  campaignFormData: {
    heading: '',
    subHeading: '',
    footer: '',
    links: '',
    image: {},
    isBestSellingSelected: '',
    isDiscountedSelected: '',
    isNewArrivalsSelected: '',
  },
  isLoading: false,
  formErrors: {},
  mailingListDetails: [],
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAILING_LIST_DETAILS:
      return {
        ...state,
        mailingListDetails: action.payload
      }
    case CAMPAIGN_CHANGE:
      return {
        ...state,
        campaignFormData: {
            ...state.campaignFormData,
            ...action.payload,
        }
      };
    case FETCH_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload,
      };
    case FETCH_ALL_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case CREATE_CAMPAIGN:
      return {
        ...state,
        campaignFormData: action.payload
      };
    case REMOVE_CAMPAIGN:
      const index = state.campaigns.findIndex(b => b._id === action.payload);
      return {
        ...state,
        campaigns: [
          ...state.campaigns.slice(0, index),
          ...state.campaigns.slice(index + 1)
        ]
      };
    case SET_CAMPAIGN_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload
      };
    case RESET_CAMPAIGNS:
      return {
        ...state,
        campaignFormData: {
          heading: '',
          subHeading: '',
          footer: '',
          image: {},
          isBestSellingSelected: '',
          isDiscountedSelected: '',
          isNewArrivalsSelected: '',
        },
        formErrors: {}
      };
    case ADD_CAMPAIGNS:
      return {
        ...state,
        campaigns: [...state.campaigns, action.payload]
      };
    case SET_CAMPAIGN_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default campaignReducer;
