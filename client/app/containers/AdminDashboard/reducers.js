import {
    FETCH_RECENT_ORDERS,
    FETCH_BOUGHT_PRODUCTS,
    TOTAL_USERS,
    WEBSITE_VISITS,
    FETCH_ORDERS,
    FETCH_REVIEWS,
    TOTAL_CAMPAIGNS,

    SET_SELECTED_OVERVIEW,
    SET_ANALYTICS_DATA,
    
    IS_LOADING_DASHBOARD,
    SET_MAINTENANCE_STATUS,

    SET_INPUT_MAINTENANCE_TEXT,
    SET_INPUT_WEBSITE_TEXT,
    SET_WEBSITE_INFO_STATUS,
} from './constants';

const initialState = {
    recentOrders: 0,
    boughtProducts: 0,
    totalUsers: 0,
    websiteVisits: 0,
    totalReviews: 0,

    fetchOrders: [],
    isLoading: false,
    selected: {
      dateRange: 'This Month'
    },
    analyticsData: [],
    campaigns: {},

    isLoading: false,
    maintenanceStatus: false,
    inputMaintenanceText: "",
    websiteInfoText: '',
    websiteInfoStatus: false,
  };
  
  const adminDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_WEBSITE_INFO_STATUS:
        return {
          ...state,
          websiteInfoStatus: action.payload
        };
      case SET_INPUT_WEBSITE_TEXT:
        return {
          ...state,
          websiteInfoText: action.payload
        };
      case SET_INPUT_MAINTENANCE_TEXT:
        return {
          ...state,
          inputMaintenanceText: action.payload
        };
      case SET_MAINTENANCE_STATUS:
        return {
          ...state,
          maintenanceStatus: action.payload
        };
      case IS_LOADING_DASHBOARD:
        return {
          ...state,
          isLoading: action.payload,
        }
      case TOTAL_CAMPAIGNS:
        return {
          ...state,
          campaigns: action.payload,
        };
      case SET_ANALYTICS_DATA:
        return {
          ...state,
          analyticsData: action.payload,
        };
      case SET_SELECTED_OVERVIEW:
        return {
          ...state,
          selected: action.payload,
        }
      case FETCH_RECENT_ORDERS:
        return {
            ...state,
            recentOrders: action.payload,
        };
      case FETCH_BOUGHT_PRODUCTS:
        return {
            ...state,
            boughtProducts: action.payload,
        };
      case TOTAL_USERS:
        return {
            ...state,
            totalUsers: action.payload,
        }
      case WEBSITE_VISITS:
        return {
            ...state,
            websiteVisits: action.payload,
        }

      case FETCH_REVIEWS:
        return {
            ...state,
            totalReviews: action.payload,
        }
      case FETCH_ORDERS:
        return {
            ...state,
            fetchOrders: action.payload,
        }
      default:
        return state;
    }
}

export default adminDashboardReducer;
