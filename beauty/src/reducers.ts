import { combineReducers } from '@reduxjs/toolkit';

import service from './containers/Services/reducers'
import booking from './containers/Booking/reducers';

const rootReducer = combineReducers({
  service,
  booking
})

export default rootReducer;
