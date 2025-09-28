import { combineReducers } from '@reduxjs/toolkit';

import service from './containers/Services/reducers'

const rootReducer = combineReducers({
  service
})

export default rootReducer;
