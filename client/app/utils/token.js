/**
 *
 * token.js
 * axios default headers setup
 */

import axios from 'axios';

const setToken = token => {
  if (token) {
    //axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.withCredentials = true;
  } else {
    //delete axios.defaults.headers.common['Authorization'];
    axios.defaults.withCredentials = false;
  }
};

export default setToken;
