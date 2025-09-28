/*
 *
 * Cart actions
 *
 */

import { push } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';
import { NGNTAXRATE, FOREIGNTAXRATE } from '../../components/Common/TaxRate';
const fx = require('money');


import {
  HANDLE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  HANDLE_CART_TOTAL,
  SET_CART_ID,
  CLEAR_CART,
  SELECTED_ADDRESS_ERROR,
  SELECTED_ADDRESS,
  REMOVE_SELECTED_ADDRESS,

  HANDLE_CART_AMOUNT,
  HANDLE_SERVICE_CHARGE,
} from './constants';

import { TOGGLE_SHIPPING } from '../Shipping/constants';


import {
  SET_PRODUCT_SHOP_FORM_ERRORS,
  RESET_PRODUCT_SHOP
} from '../Product/constants';

import { API_URL, CART_ID, CART_ITEMS, CART_TOTAL } from '../../constants';
import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { toggleCart } from '../Navigation/actions';


export const convertCurrency = async(selectCurrency, price) => {
  let currencyData = {};

  // here as cart items price is being shown it should update the items
  // price according to the select currency currency
  // rate would be fetch from the fetchRate() and money would be imported
  // and used to convert the item.price to the select currency currency
  if (selectCurrency[0] === 'ngn') {
    return price
  }
  fx.base = 'USD';
  const currencyRate = await axios.get(`${API_URL}/currency_rate/get_currencies`);
  const cD = currencyRate.data.currencies;
  for (let items in cD){
    const rateObject = cD[items].rate;

    for (let key in rateObject) {
      currencyData[key] = rateObject[key];
    }
  }
  fx.rates = currencyData;

  const itemPrice = fx.convert(price, {
    from: "NGN",
    to: selectCurrency[0].toUpperCase()
  })
  return itemPrice;
}


// Handle Add To Cart
export const handleAddToCart = (product) => {
  return async(dispatch, getState) => {
    /*product.quantity = Number(getState().product.productShopData.quantity);*/
    const selectedQuantity = Number(getState().product.productShopData.quantity);
    product.oldQuantity = product.oldQuantity ? product.oldQuantity - selectedQuantity : product.quantity - selectedQuantity;
    product.quantity = selectedQuantity;
    const newPrice = product.discountPrice > 0 ? product.price -  (product.price * (product.discountPrice / 100)) : product.price
    product.totalPrice = newPrice;
    // product.totalPrice = parseFloat(product.totalPrice.toPrecision(3));

    // convert product.totalPrice to current currency price
    // collect default currency is select_currency is not available
    const sL = getState().currency.select_currency.length;
    const selectCurrency = sL > 0 ? getState().currency.select_currency : getState().currency.default_currency;


    product.cartCurrency = selectCurrency[0]
    if (selectCurrency[0] === 'ngn') {
      product.totalPrice = Math.round(Number(product.totalPrice))
    } else {
      product.totalPrice = await convertCurrency(selectCurrency, product.totalPrice)
      product.totalPrice = parseFloat(product.totalPrice.toPrecision(3));
    }

    const inventory = getState().product.storeProduct.inventory;

    const result = calculatePurchaseQuantity(inventory);

    const rules = {
      quantity: `min:1|max:${result}`
    };

    const { isValid, errors } = allFieldsValidation(product, rules, {
      'min.quantity': 'Quantity must be at least 1.',
      'max.quantity': `Quantity may not be greater than ${result}.`
    });

    if (!isValid) {
      return dispatch({ type: SET_PRODUCT_SHOP_FORM_ERRORS, payload: errors });
    }

    dispatch({
      type: RESET_PRODUCT_SHOP
    });

    dispatch({
      type: ADD_TO_CART,
      payload: product
    });

    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS));

    let newCartItems = [];
    if (cartItems) {
      newCartItems = [...cartItems, product];
    } else {
      newCartItems.push(product);
    }
    localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));

    dispatch(calculateCartTotal());
    //dispatch(toggleCart()); // on this if you want cart to immediately show after adding a product to cart
  };
};

// Handle Remove From Cart
export const handleRemoveFromCart = product => {
  return (dispatch, getState) => {
    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS));
    const newCartItems = cartItems.filter(item => item._id !== product._id);
    localStorage.setItem(CART_ITEMS, JSON.stringify(newCartItems));
    const selectedQuantity = product.quantity;
    product.oldQuantity = product.oldQuantity + selectedQuantity;

    dispatch({
      type: REMOVE_FROM_CART,
      payload: product
    });
    dispatch(calculateCartTotal());
    // dispatch(toggleCart());
  };
};

export const calculateCartTotal = () => {
  return async(dispatch, getState) => {
    const cartItems = getState().cart.cartItems;
    
    // collect default currency is select_currency is not available
    const sL = getState().currency.select_currency.length;
    const selectCurrency = sL > 0 ? getState().currency.select_currency : getState().currency.default_currency;
    let currencyData = {};

    // here as cart items price is being shown it should update the items
    // price according to the select currency currency
    // rate would be fetch from the fetchRate() and money would be imported
    // and used to convert the item.price to the select currency currency
    fx.base = 'USD';
    const currencyRate = await axios.get(`${API_URL}/currency_rate/get_currencies`);
    const cD = currencyRate.data.currencies;
    for (let items in cD){
      const rateObject = cD[items].rate;

      for (let key in rateObject) {
        currencyData[key] = rateObject[key];
      }
    }
    fx.rates = currencyData;

    let total = 0;

    cartItems.map(item => {
      /*const itemPrice = fx.convert(item.price, {
        from: "NGN",
        to: selectCurrency[0].toUpperCase()
      })*/
     const itemPrice = item.totalPrice;
      total += itemPrice * item.quantity;
    });

    dispatch({
      type: HANDLE_CART_AMOUNT,
      payload: total
    })


    if (selectCurrency[0] === 'ngn') {
      /*let serviceCharge, taxRate = 0;
      if (total > 2500) {
        // 100 naira fee is added for orders above 2500
        serviceCharge = Math.round(((total + 100) / (1 - NGNTAXRATE)) - total)
        if (serviceCharge > 2000) {
          // paystack fees are capped at 2000 maximum
          serviceCharge = 2000
        }
        taxRate = total + serviceCharge
      } else {
        // 100 naira fee is waived for orders below 2500
        serviceCharge = Math.round((total / (1 - NGNTAXRATE)) - total)
        taxRate = total + serviceCharge
      }
      dispatch({
        type: HANDLE_SERVICE_CHARGE,
        payload: serviceCharge
      })
      total = Math.round(Number(taxRate))*/

      total = Math.round(Number(total))
    } else {
      /*const serviceCharge = Math.round(((total + 100) / (1 - FOREIGNTAXRATE)) - total)
      const taxRate = total + serviceCharge
      dispatch({
        type: HANDLE_SERVICE_CHARGE,
        payload: serviceCharge
      })
      total = parseFloat(taxRate.toPrecision(3));*/

      total = parseFloat(total.toPrecision(3))
    }
    localStorage.setItem(CART_TOTAL, total);

    dispatch({
      type: HANDLE_CART_TOTAL,
      payload: total
    });
  };
};

// set cart store from local storage
export const handleCart = () => {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem(CART_ITEMS)),
    cartTotal: localStorage.getItem(CART_TOTAL),
    cartId: localStorage.getItem(CART_ID),
    cartCurrency: localStorage.getItem('select_currency')
  };

  return (dispatch, getState) => {
    if (cart.cartItems != undefined) {
      dispatch({
        type: HANDLE_CART,
        payload: cart
      });
      dispatch(calculateCartTotal());
    }
  };
};

export const handleCheckout = () => {
  return (dispatch, getState) => {
    const successfulOptions = {
      title: `Please Login to proceed to checkout`,
      position: 'tr',
      autoDismiss: 1
    };

    dispatch(toggleCart());
    dispatch(push('/login'));
    dispatch(success(successfulOptions));
  };
};

// Continue shopping use case
export const handleShopping = () => {
  return (dispatch, getState) => {
    dispatch(push('/shop'));
    dispatch(toggleCart());
  };
};

// create cart id api
export const getCartId = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem(CART_ID);
      const cartItems = getState().cart.cartItems;
      const currency = getState().cart.cartCurrency;
      let products;
      if (currency === 'ngn') {
        products = await getCartItems(false, cartItems);
      } else {
        products = await getCartItems(currency, cartItems);
      }

      // create cart id if there is no one
      if (!cartId) {
        const response = await axios.post(`${API_URL}/cart/add`, {
          products,
          currency
        });

        dispatch(setCartId(response.data.cartId));
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const setCartId = cartId => {
  return (dispatch, getState) => {
    localStorage.setItem(CART_ID, cartId);
    dispatch({
      type: SET_CART_ID,
      payload: cartId
    });
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    localStorage.removeItem(CART_ITEMS);
    localStorage.removeItem(CART_TOTAL);
    localStorage.removeItem(CART_ID);

    dispatch({
      type: CLEAR_CART
    });
  };
};

export const getCartItems = async(currency, cartItems) => {
  const newCartItems = [];
  for (const item of cartItems) {
    const newItem = {};
    let newPrice;
    if (currency) {
      newPrice = await convertCurrency([currency], item.price);
    } else {
      newPrice = item.price
    }
    newItem.name = item.name;
    newItem.image = item.imageUrl;
    newItem.quantity = item.quantity;
    newItem.price = newPrice;
    newItem.taxable = item.taxable;
    newItem.product = item._id;
    newItem.discountPrice = item.discountPrice;
    newCartItems.push(newItem);
  }

  return newCartItems;
};

const calculatePurchaseQuantity = inventory => {
  /*if (inventory <= 25) {
    return 1;
  } else if (inventory > 25 && inventory <= 100) {
    return 5;
  } else if (inventory > 100 && inventory < 500) {
    return 25;
  } else {
    return 50;
  }*/
 return 100;
};

export const removeSelectedAddress = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_SELECTED_ADDRESS,
    });
  };
};

export const selectAddress = (id) => {
  return (dispatch, getState) => {
    const selectedAddress = getState().cart.selectedAddress;

    if (selectedAddress.length > 0) {
      // Prevent selecting multiple addresses
      handleError({
        message: 'You can only select one address for checkout'
      }, dispatch);
      return removeSelectedAddress()
    }

    // Update the selectedAddress state
    if (id) {
      dispatch({
        type: SELECTED_ADDRESS,
        payload: [id],
      });
    }
  };
};


export const termsConfirm = () => {
  return async(dispatch, getState) => {
    
  }
}

export const toggleShipping = () => {
  return {
    type: TOGGLE_SHIPPING
  };
};
