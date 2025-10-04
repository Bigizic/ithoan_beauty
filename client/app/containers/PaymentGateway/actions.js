/**
 * Payment Gateway actions
 */
import { push } from 'connected-react-router';
import axios from 'axios';

import {
  SET_ORDER_ID,
  TOGGLE_ORDER,
  SET_ORDER_RECEIPTS,
  RESET_ORDER_RECEIPTS,
  ORDER_PAYMENT_IS_LOADING,
  ORDER_FORM_ERRORS,
  SET_BANK_COPIED,
  ORDER_PAYMENT_HELPER,

  SET_ORDER_NOTE
} from './constants'

import { HANDLE_CART_TOTAL } from '../Cart/constants';

import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';
import handleError from '../../utils/error';
import { toggleCart } from '../Navigation/actions';
import { clearCart, getCartId } from '../Cart/actions';
import { SET_SHIPPING_ERROR } from '../Shipping/constants';
import { fetchBanks } from '../Account/actions';
import imageCompression from 'browser-image-compression';
import { resetSelectedShippingErrors } from '../Shipping/actions';


export const toggleOrder = () => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_ORDER,
    })
  }
}


export const setOrderPaymentHelper = (value) => {
  return (dispatch, getState) => {
    dispatch({
      type: ORDER_PAYMENT_HELPER,
      payload: value
    })
  }
}


export const resetOrderReceipt = () => {
  return (dispatch, getState) => {
    dispatch({
      type: RESET_ORDER_RECEIPTS
    })
  }
}


export const purchaseOrderIsLoading = (stats) => {
  return (dispatch, getState) => {
    dispatch({
      type: ORDER_PAYMENT_IS_LOADING,
      payload: stats
    })
  }
}

export const setOrderNote = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_ORDER_NOTE,
      payload: value
    })
  }
}

export const closeModal = (buying = false) => {
  return (dispatch, getState) => {
    const orderPaymentHelper = getState().payment.orderPaymentHelper;
    const orderId = getState().payment.orderId
    dispatch(toggleOrder());

    if (orderPaymentHelper) {
      dispatch(toggleCart());
      dispatch(clearCart());
      dispatch(resetOrderReceipt());
      dispatch(resetSelectedShippingErrors());
      if (orderId.length > 1 && !buying) { dispatch(push(`/order/${orderId}`)) }
      dispatch(setOrderPaymentHelper(false))
    }
    dispatch(resetOrderReceipt());
    dispatch(resetSelectedShippingErrors());
  }
}

export const setPaymentGatewayFormError = (error) => {
  return (dispatch, getState) => {
    dispatch({
      type: ORDER_FORM_ERRORS,
      payload: error
    })
  }
}


export const handleBankCopy = (accountNumber) => {
  return (dispatch, getState) => {
    navigator.clipboard.writeText(accountNumber)
      .then(() => {
        dispatch({
          type: SET_BANK_COPIED,
          payload: accountNumber
        });

        setTimeout(() => {
          dispatch({
            type: SET_BANK_COPIED,
            payload: null
          });
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard: ', err);
      });
  };
};


const productStatusChecker = async (cartId) => {
  const getCart = await axios.get(`${API_URL}/cart/${cartId}`);
  let productIds = []

  for (const item of getCart.data.cart.products) {
    // find a product in the product count,
    // create a new one else
    productIds.push(item.product);
  }

  for (const product of productIds) {
    const response = await axios.get(`${API_URL}/product/get_product_id/${product}`)
    const checkProductStatus = response.data.product;
    if (!checkProductStatus.isActive || checkProductStatus.quantity < 1) {
      return false
    }
  }
  return true
}


/**
 * - handles error checks for checkout and if checkout is good without errors initiates
 * add order function to add an order to db
 * @returns 
 */
export const newPlaceOrder = (navigate) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const cartItems = getState().cart.cartItems;
    const userAddress = getState().address.shippingAddress;

    // get user selected address
    const selectedAddress = getState().cart.selectedAddress;
    const shipping = getState().shipping;

    if (userAddress.length > 0 && selectedAddress.length === 0) {
      return handleError({ message: 'Select an address to continue' }, dispatch)
    }
    const rules = {
      selectedShipping: 'required',
      termsSelected: 'accepted',
    };

    const { isValid, errors } = allFieldsValidation(shipping, rules, {
      'required.selectedShipping': 'Please select a dispatch type',
      'accepted.termsSelected': 'Accept the terms to continue',
    });

    if (!isValid) {
      return dispatch({ type: SET_SHIPPING_ERROR, payload: errors });
    }

    if (userAddress.length > 0) {
      if (token && cartItems.length > 0) {
        dispatch(purchaseOrderIsLoading(true))
        dispatch(toggleCart());
        Promise.all([dispatch(getCartId()), dispatch(fetchBanks())]).then(() => {
          return dispatch(createNewOrder())
        })
      }
    } else {
      // ask user to add an address
      navigate(`/dashboard/address/add`);
      handleError({ message: 'Add an address to continue' }, dispatch)
    }

    dispatch(toggleCart());
  };
};



// sends request to api to create new order
export const createNewOrder = () => {
  return async (dispatch, getState) => {
    try {
      const c = getState().currency.select_currency
      const curr = c.length > 0 ? c[0] : getState().currency.default_currency[0]

      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;
      const currency = getState().cart.cartCurrency || curr;
      const { phoneNumber } = getState().account.user;
      const selectedAddress = getState().cart.selectedAddress;
      const shipping = getState().shipping;
      const shippingSelected = shipping.shippingInfos[shipping.selectedShipping[0]];

      if (cartId) {
        const checkProductStatus = await productStatusChecker(cartId);

        if (!checkProductStatus) {
          handleError({ message: 'Cannot buy product at this time' }, dispatch)
          return;
        }
        const response = await axios.post(`${API_URL}/order/add`, {
          cartId,
          total,
          currency,
          selectedAddress,
          phoneNumber: phoneNumber,
          deliveryType: shippingSelected[0],
        });
        dispatch(purchaseOrderIsLoading(false))
        dispatch(toggleOrder());
        dispatch(setOrderPaymentHelper(true));
        return dispatch({
          type: SET_ORDER_ID,
          payload: response.data.order._id
        })
      }
    } catch (error) {
      handleError(error);
    }
  }
}


export const handleOrderCheckout = (navigate) => {
  return (dispatch, getState) => {
    try {
      const orderId = getState().payment.orderId;
      const orderReceipts = getState().payment.orderReceipts;

      if (orderReceipts.length === 0) {
        return dispatch(setPaymentGatewayFormError("You must upload at least one image."))
      }
      dispatch(setPaymentGatewayFormError(''));
      dispatch(purchaseOrderIsLoading(true));
      dispatch(newAddOrder(orderId, orderReceipts, navigate));
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}


export const newAddOrder = (orderId, orderReceipts, navigate) => {
  return async (dispatch, getState) => {
    try {
      const formData = new FormData();
      const note = getState().payment.note;
      formData.append('orderId', orderId);
      formData.append('note', note);
      orderReceipts.forEach((image, index) => {
        const renamedFile = new File([image], `order_${orderId}_.png`, { type: image.type });
        formData.append(`image_${index}`, renamedFile);
      });

      const response = await axios.put(`${API_URL}/order/edit/order`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.status === 200) {
        // payment successful
        // redirect to confirmation page
        navigate(`/order/success/${response.data.order._id}`);
        dispatch(clearCart());
        dispatch(purchaseOrderIsLoading(false));
        return dispatch(closeModal(true));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


export const setOrderReceipt = (images) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const existingImages = state.order.orderReceipts || [];

      const combinedImages = [...existingImages, ...images].slice(0, 3);

      const validImages = combinedImages.filter((img) => {
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(img.type);
      });

      if (validImages.length !== combinedImages.length) {
        return handleError({ message: 'Please upload files with jpg, jpeg, png format.' }, dispatch);
      }

      dispatch({
        type: SET_ORDER_RECEIPTS,
        payload: validImages,
      });
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const handleImageUpload = (e) => {
  return async (dispatch, getState) => {
    if (e) {
      const files = [e.file];
      const orderReceipts = getState().payment.orderReceipts;

      if (orderReceipts.length + files.length > 1) {
        return dispatch(setPaymentGatewayFormError("You can upload up to 1 image only."))
      }

      try {
        const compressedImages = await Promise.all(
          files.map(async (file) => {
            const options = {
              maxSizeMB: 0.1, // Approx 100KB
              maxWidthOrHeight: 1024,
              useWebWorker: true,
            };
            return await imageCompression(file, options);
          })
        );

        dispatch(setOrderReceipt([...compressedImages]));
        dispatch(setPaymentGatewayFormError(''));
      } catch (err) {
        setError("Failed to compress image. Please try again.");
      }
    } else {
      const orderReceipts = getState().payment.orderReceipts;
      if (orderReceipts.length > 0) {
        dispatch(resetOrderReceipt())
      }
    }
  }
};


// lets a customer make payment for a saved unpaid order
export const makePaymentUnpaidOrder = (orderId, total) => {
  return async (dispatch, getState) => {
    try {
      if (orderId) {
        dispatch(toggleOrder())
        Promise.all([dispatch(fetchBanks())]).then(() => {
          dispatch({
            type: HANDLE_CART_TOTAL,
            payload: total
          })
          return dispatch({
            type: SET_ORDER_ID,
            payload: orderId,
          })
        })
      }

    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
