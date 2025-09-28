// function to get current currency from getState

const axios = require('axios');
const fx = require('money');

import { OPEN_EXCHANGE_API_KEY } from '../../../constants';
import { API_URL } from '../../../constants';
const OPEN_EXCHANGE_URL = `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_API_KEY}`

fx.base = "USD";;

/**
 * 
 * @returns 
 */
export const getRates = async () => {
  let req = await axios.get(OPEN_EXCHANGE_URL);

  req = req.data

  const { base, rates } = req;
  const { USD, NGN, GBP } = rates;

  return {
    rate: { USD, GBP, NGN },
    base: base
  }

}

/**
 * 
 * @param {*} currency 
 * @param {*} amountInNGN 
 * @returns string
 */
const convertCurrency = async (currency, amountInNGN) => {
  const date = new Date();
  let currencyData = {};

  // check database if currencyRate exist for currency
  const currencyRateExist = await axios.get(`${API_URL}/currency_rate/get_currencies`);


  if (currencyRateExist.status === 200) {
    // currency rates exits in the db
    const cD = currencyRateExist.data.currencies;
    for (let items in cD){
      const rateObject = cD[items].rate;

      for (let key in rateObject) {
        currencyData[key] = rateObject[key];
      }
    }
    // currencyData contains new rate

    // check if date from db is earlier than the date()
    const serverTime = date.getHours() * 3600 + date.getMinutes() * 60;

    // set to 12:00 utc so if serverTime is > 43,200 keep sending request otherwise stop
    if (serverTime > 43200) {
      // date in db is earlier than the current date so fetch new rates from getRates
      currencyData = await getRates();
      // upon getting new rates update the rate record in the db
      for (const items in currencyData.rate) {
        const tempRate = { [items]: currencyData.rate[items] }
        await axios.put(`${API_URL}/currency_rate/edit`,{
          rate: tempRate,
        })
      }
      fx.rates = currencyData.rate;
      const convertedAmount = fx.convert(amountInNGN, { from: "NGN", to: currency.toUpperCase() });
      return convertedAmount.toPrecision(3);  // convert to 3sf
    }
    fx.rates = currencyData;
    const convertedAmount = fx.convert(amountInNGN, { from: "NGN", to: currency.toUpperCase() });
    return convertedAmount.toPrecision(3);  // convert to 3sf

  } else if (currencyRateExist.status === 201) {
    // create currencies Rate as they don't exist
    const rateGet = await getRates();
    await axios.post(`${API_URL}/currency_rate/add`, rateGet, {
      headers: { 'Content-Type': 'application/json' },
    });
    // add currency succeeded
    fx.rates = rateGet.rate
    const convertedAmount = fx.convert(amountInNGN, { from: "NGN", to: currency.toUpperCase() });
    return convertedAmount.toPrecision(3);  // convert to 3sf
  }
   else {
    // rate for currency doesn't exist so fetch rate
    const rateGet = await getRates();
    fx.rates = rateGet.rate
    const convertedAmount = fx.convert(amountInNGN, { from: "NGN", to: currency.toUpperCase() });
    return convertedAmount.toPrecision(3);  // convert to 3sf
  }
};

/**
 * 
 * @param {*} all_currency 
 * @param {*} currentCurrency 
 * @param {*} productPrice 
 * @returns 
 */

export const currencyFunction = async (all_currency, currentCurrency, productPrice) => {
  // get currentCurrency symbol from all_currency
  let value;

  if ( ['gbp', 'usd'].includes(currentCurrency[0]) )  {
    // convert currency
    const convert = await convertCurrency(currentCurrency[0], productPrice)
    if (currentCurrency[0] === 'gbp') {
      // convert to gbp
      const newConvert = await convertCurrency('gbp', productPrice)
      return `${all_currency[currentCurrency]}${newConvert.toLocaleString()}`
    }

    value = `${all_currency[currentCurrency]}${convert.toLocaleString()}`
  } else {
    value = `${all_currency[currentCurrency]}${productPrice.toLocaleString()}`
  }
  return value;
}
