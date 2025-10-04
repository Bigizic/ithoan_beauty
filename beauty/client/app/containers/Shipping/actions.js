/**
 * Shipping actions
 */

import handleError from '../../utils/error';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
    TOGGLE_SHIPPING, SET_SHIPPINIG_INFO,
    RESET_TERMS_SELECTED_ERROR, RESET_SELECTED_SHIPPING_ERROR,
    UPDATE_ORDER_SHIPPING, UPDATE_ORDER_SHIPPING_IS_LOADING
} from "./constants";

import { SET_TERMS_SELECT, REMOVE_TERMS } from './constants';
import { API_URL } from '../../constants';

export const toggleShipping = () => {
    return {
      type: TOGGLE_SHIPPING
    };
};

export const resetSelectedShippingErrors = () => {
    return (dispatch, getState) => {
        dispatch({
            type: RESET_SELECTED_SHIPPING_ERROR
        })
    }
}

export const setOrderShippingInformation = () => {
    return (dispatch, getState) => {
        const order = getState().order.order;
        const newOrder = {
            id: order?._id,
            address: order?.selectedAddress?.address,
            city: order?.selectedAddress?.city,
            state: order?.selectedAddress?.state,
            country: order?.selectedAddress?.country,
            deliveryType: order?.deliveryType,
            phoneNumber: order?.phoneNumber
        }
        dispatch({
            type: UPDATE_ORDER_SHIPPING,
            payload: newOrder
        })

    }
}

export const updateOrderShippingInformation = (name, value) => {
    return (dispatch) => {
        const orderShippingInfo = {};
        orderShippingInfo[name] = value;
        dispatch({
            type: UPDATE_ORDER_SHIPPING,
            payload: orderShippingInfo
        })
    }
}

export const termsSelected = () => {
    return (dispatch) => {
        dispatch({
            type: SET_TERMS_SELECT
        })
        dispatch({
            type: RESET_TERMS_SELECTED_ERROR
        })
    }
}

export const setUpdateShippingLoading = (val) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_ORDER_SHIPPING_IS_LOADING,
            payload: val
        })
    }
}

export const termsRemoved = () => {
    return {
        type: REMOVE_TERMS
    }
}


export const selectShipping = (value) => {
    return (dispatch, getState) => {
        try {
            if (value) {
                const shippingInfos = getState().shipping.shippingInfos;
                // get keys
                const keys = Object.keys(shippingInfos)
                if (keys.includes(value)) {
                    // value exist in key
                    dispatch({
                        type: SET_SHIPPINIG_INFO,
                        payload: value
                    })
                    // reset error if found otherwise just pass
                }
            }
        } catch (error) {
            handleError(error, dispatch)
        }
    }
}

export const updateShippingInformation = () => {
    return async(dispatch, getState) => {
        try {
            dispatch(setUpdateShippingLoading(true));
            const newOrder = getState().shipping.orderShippingInfo;
            const response = await axios.put(`${API_URL}/order/edit/order_address/${newOrder.id}`, newOrder)
            if (response.status === 200) {
                const successfulOptions = {
                  title: response.data.message,
                  position: 'tr',
                  autoDismiss: 2
                };
                dispatch(success(successfulOptions));
                window.location.reload()
              }
        } catch(error) {
            handleError(error, dispatch)
        } finally {
            dispatch(setUpdateShippingLoading(false));
        }
    }
}


