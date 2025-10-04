/**
 * shipping info reducer
 */


import {
    SET_TERMS_SELECT, REMOVE_TERMS,
    SET_SHIPPINIG_INFO, SET_SHIPPING_ERROR,
    TOGGLE_SHIPPING, RESET_SELECTED_SHIPPING_ERROR,
    RESET_TERMS_SELECTED_ERROR,
    UPDATE_ORDER_SHIPPING,
    UPDATE_ORDER_SHIPPING_IS_LOADING
} from "./constants";

const initialState = {
    shippingInfos: {
        lag: ['lagos delivery', 'pay the rider when it gets to you'],
        inter: ['Inter state', 'pay the driver when it gets to you'],
        abroad: ['International(abroad)', 'send a dm for shipping rates']
    },

    selectedShipping: [],

    formErrors: {},
    isShippingOpen: false,
    termsSelected: false,
    orderShippingInfo: {
        id: '',
        address: '',
        city: '',
        state: '',
        country: '',
        deliveryType: '',
        phoneNumber: ''
    },
    isLoading: false
}


const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_ORDER_SHIPPING_IS_LOADING:
        return {
            ...state,
            isLoading: action.payload
        };
      case UPDATE_ORDER_SHIPPING:
        return {
            ...state,
            orderShippingInfo: {
                ...state.orderShippingInfo,
                ...action.payload
            }
        };
      case SET_SHIPPINIG_INFO:
        return {
            ...state,
            selectedShipping: [action.payload]
        };

        case SET_SHIPPING_ERROR:
            return {
                ...state,
                formErrors: action.payload
            };

        case RESET_SELECTED_SHIPPING_ERROR:
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    selectedShipping: []
                },
                termsSelected: false
            };

        case RESET_TERMS_SELECTED_ERROR:
            return {
                ...state,
                formErrors: {
                    ...state.formErrors,
                    termsSelected: []
                }
            };

        case TOGGLE_SHIPPING:
            return {
                ...state,
                isShippingOpen: !state.isShippingOpen
            };
        case SET_TERMS_SELECT:
            return {
                ...state,
                termsSelected: true
            }
        case REMOVE_TERMS:
            return {
                ...state,
                termsSelected: false
            }

        default:
            return state;
    }
}


export default shippingReducer
