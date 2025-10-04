import Paystack from '@paystack/inline-js';
import axios from 'axios';

import { API_URL, PAYSTACK_KEY } from '../constants';


export const payStackHelper = async (
  email, amount,
  currency, firstName,
  lastName, phone,
  cartId, selectedAddress, deliveryType) => {

  return new Promise((resolve, reject) => {
    let globalId;
    const popup = new Paystack();
    
    popup.checkout({
      key: PAYSTACK_KEY,
      email,
      amount: amount * 100,
      currency: currency.toUpperCase(),
      firstName,
      lastName,
      phone,

      onLoad: async(response) => {
        try {
          // sends request to api to add an order
          const { id } = response;
          globalId = id
          await axios.post(`${API_URL}/order/add`, {
            cartId,
            total: amount,
            currency,
            selectedAddress,
            paystackId: id,
            phoneNumber: phone,
            deliveryType,
          });
        } catch (error) {
          reject(new Error(`Payment failed: ${error.message}`));
        }
      },

      onSuccess: async(transaction) => {
        try {
          const { status, message, reference } = transaction;
          if (status === 'success' && message === 'Approved') {
            // send request to api to edit order as payment has been sucessful
            // api would be responsible for sending email to customer and admin
            const response = await axios.put(`${API_URL}/order/edit/order`, {
              payStackId: globalId,
              paystackReference: reference,
            });
            resolve(response);
          }
        } catch (error) {
          reject(new Error(`Payment failed: ${error.message}`));
        }
      },

      onElementMount: (elements) => {
      },

      onCancel: () => {
        reject(new Error('Payment cancelled.'));
      },

      onError: (error) => {
        reject(new Error(`Payment failed: ${error.message}`));
     }
    });
  });
};
