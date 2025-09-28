/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';
import { ROLES } from '../../constants';


import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  SET_ADVANCED_FILTERS,
  CLEAR_ORDERS,
  FETCH_ALL_MY_PRODUCTS,
} from './constants';

import { SET_SHIPPING_ERROR } from '../Shipping/constants';

import { clearCart, getCartId } from '../Cart/actions';
import { toggleCart } from '../Navigation/actions';
import handleError from '../../utils/error';
import { API_URL } from '../../constants';
import { payStackHelper } from '../../utils/paystack_helper';
import { allFieldsValidation } from '../../utils/validation';

import { convertCurrency } from '../Cart/actions';


/**
 * 
 * @param {*} value 
 * @returns 
 */

export const updateOrderStatus = value => {
  return (dispatch, getState) =>{
    dispatch({
      type: UPDATE_ORDER_STATUS,
      payload: value,
    })
  }
};


/**
 * 
 * @param {*} value 
 * @returns 
 */
export const setOrderLoading = value => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value
  };
};


/**
 * 
 * @param {*} page 
 * @returns 
 */
export const fetchOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`${API_URL}/order`, {
        params: {
          page: page ?? 1,
          limit: 20
        }
      });

      const { orders, totalPages, currentPage, count, paidCount } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count, paidCount }
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};


/**
 * 
 * @param {*} page 
 * @returns 
 */
export const fetchAccountOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`${API_URL}/order/me`, {
        params: {
          page: page ?? 1,
          limit: 20
        }
      });

      const { orders, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count }
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};


/**
 * 
 * @param {*} filter 
 * @returns 
 */
export const searchOrders = filter => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`${API_URL}/order/search`, {
        params: {
          search: filter.value
        }
      });

      dispatch({
        type: FETCH_SEARCHED_ORDERS,
        payload: response.data.orders
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};


/**
 * 
 * @param {*} id 
 * @param {*} withLoading 
 * @returns 
 */
export const fetchOrder = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        dispatch(setOrderLoading(true));
      }

      const response = await axios.get(`${API_URL}/order/${id}`);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false));
      }
    }
  };
};


/**
 * 
 * @returns 
 */
export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      await axios.delete(`${API_URL}/order/cancel/${order._id}`);

      dispatch(push(`/dashboard/orders`));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


/**
 * 
 * @param {*} itemId 
 * @param {*} status 
 * @returns 
 */
export const updateOrderItemStatus = (itemId, status) => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;
      const userRole = getState().account.user.role;

      // delete order
      if (status === 'delete') {
        const response = await axios.delete(`${API_URL}/order/cancel/${itemId}`);
        if (response.status === 200) {
          dispatch(push(`/dashboard/orders/customers`));
          const successfulOptions = {
            title: `Order has been deleted`,
            position: 'tr',
            autoDismiss: 2
          };
          dispatch(success(successfulOptions));
        }
        return;
      }
      if (status === 'paid') {
        const response = await axios.put(`${API_URL}/order/update_order_products`,
          {
            orderId: itemId,
            status: true
          }
        )
        if (response.status === 200) {
          const successfulOptions = {
            title: response.data.message,
            position: 'tr',
            autoDismiss: 2
          };
          dispatch(success(successfulOptions));
        }
        return;
      }

      const response = await axios.put(
        `${API_URL}/order/status/item/${itemId}`,
        {
          orderId: order._id,
          cartId: order.cartId,
          status
        }
      );

      if (response.data.orderCancelled) {
        // check if logged in user is admin
        if (userRole === 'ROLE ADMIN') {
          dispatch(push(`/dashboard/orders/customers`));
        }
      } else {
        dispatch(updateOrderStatus({ itemId, status }));
        dispatch(fetchOrder(order._id, false));
      }

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


/**
 * 
 * @param {*} selectedAddress 
 * @param {*} deliveryType 
 * @returns 
 */
/*export const addOrder = (selectedAddress, deliveryType) => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;
      const currency = getState().cart.cartCurrency;
      const { email, firstName, lastName, phoneNumber } = getState().account.user;

      if (cartId) {
        // paystack integration
        // clear cart before triggering paystack
        dispatch(clearCart());

        // before creating an order, check if every product in the db is
        // active or the quantity is greater than 0
        const checkProductStatus = await productStatusChecker(cartId);

        if (!checkProductStatus) {
          handleError({ message: 'Cannot buy product at this time' }, dispatch)
          return;
        }
        /*const ps = await payStackHelper(
          email,
          total,
          currency,
          firstName,
          lastName,
          phoneNumber,
          cartId,
          selectedAddress,
          deliveryType
        )

        

        if (ps && ps.status === 200) {
          // payment successful
          // redirect to confirmation page
          dispatch(push(`/order/success/${ps.data.order._id}`));
          dispatch(clearCart());
        }
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};*/


/**
 * 
 * @returns 
 */
/*export const placeOrder = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');

    const cartItems = getState().cart.cartItems;

    // check if user has an address already, if not
    // direct user to add address and phone number otherwise
    // dispathc(addOrder())
    // const userAddress = getState().address.addresses;
    const userAddress = getState().address.shippingAddress;

    // get user selected address
    const selectedAddress = getState().cart.selectedAddress;
    const shipping = getState().shipping;
    const shippingSelected = shipping.shippingInfos[shipping.selectedShipping[0]];

    if (userAddress.length > 0 && selectedAddress.length === 0) {
      return handleError({message: 'Select an address to continue'}, dispatch)
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

        Promise.all([dispatch(getCartId())]).then(() => {
          dispatch(addOrder(selectedAddress, shippingSelected[0]));
        });
      }
    } else {
      // ask user to add an address
      dispatch(push(`/dashboard/address/add`));
      handleError({message: 'Add an address to continue'}, dispatch)
    }

    dispatch(toggleCart());
  };
};*/


/**
 * 
 * @returns 
 */
export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  };
};


/**
 * fetches all products from the db without pages, just fetches everything
 */
export const fetchAllMyProduct = () => {
  return async(dispatch, getState) => {
    try {
      const user = getState().account.user
      if (user.role === ROLES.Admin) {
        const response = await axios.get(`${API_URL}/product/fetch_all_my_product`)
        if (response.status === 200) {
            dispatch({
            type: FETCH_ALL_MY_PRODUCTS,
            payload: response.data.products
          });
        }
      } else {
        return;
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}


/**
 * delete products from cart, admin action after deleteing update order total price as a product doesn't exist anymore
 * @param {*} cartId 
 * @param {*} productId 
 */

export const deleteOrderCartItems = (cartId, productId) => {
  return async(dispatch, getState) => {
    if (cartId && productId) {
      const deletedItem = await axios.delete(`${API_URL}/cart/delete_product_from_cart/${cartId}/${productId}`)

      if (deletedItem.status === 200) {
        // refresh after deleting
        window.location.reload()
      }
    }
  }
}

/**
 *  handles selected products from edit order, add more products section
 * @param {*} selectedProducts 
 */
export const onAddProducts = (selectedProducts, orderId, cartId) => {
  return async (dispatch, getState) => {
    try{
      const s = getState().currency;
      const sL = s.select_currency.length;
      const selectCurrency =  sL > 0 ? s.select_currency : s.default_currency;
      let productItems = [];

      // fetch products via id, and create a new cart of products
      // alongside the selected currency
      for (const id of selectedProducts) {
        const response = await axios.get(`${API_URL}/product/${id}`)
        const product = response.data.product;

        if (product) {
          let newPrice;
          if (['gbp', 'usd'].includes(selectCurrency[0])) {
            newPrice = await convertCurrency(selectCurrency[0], product.price);
          } else {
            newPrice = product.price
          }
          productItems.push({
            quantity: 1,
            purchasePrice: newPrice,
            totalPrice: newPrice,
            taxable: product.taxable,
            product: product._id,
            discountPrice: product.discountPrice,
            name: product.name,
            image: product.imageUrl,
          })
        }
      }
      // update cart with card id
      const response = await axios.post(`${API_URL}/cart/add/${cartId}`,
        {
          product: productItems
        }
      )
      // update order field to indicate order has been edited
      const udpatedOrder = await axios.put(`${API_URL}/order/update_order_products`,
        {
          selectedProductsLength: selectedProducts.length,
          edited: true,
          orderId: orderId,
          cartId: cartId,
        }
      )
      if (response.status === 200 && udpatedOrder.status === 200) {
        const successfulOptions = {
          title: 'Cart updated',
          position: 'tr',
          autoDismiss: 2
        };
        dispatch(success(successfulOptions));
        // reset order page or refresh page
      }
      window.location.reload()
    } catch(error) {
      handleError({ message: 'An error has occured while updating order' }, dispatch)
    }
  }
}
