import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;