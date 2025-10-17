import { combineReducers } from '@reduxjs/toolkit';

import service from './containers/Services/reducers'
import booking from './containers/Booking/reducers';
import payment from './containers/PaymentGateway/reducers';
import homepage from './containers/HomePage/reducers';

const rootReducer = combineReducers({
  service,
  booking,
  payment,
  homepage
})

export default rootReducer;
