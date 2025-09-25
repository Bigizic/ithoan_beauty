import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface BookingInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  age: number;
  medicalHistory: string;
  conditions: string;
  extraInformation: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
}

export interface Booking {
  id: string;
  bookingInfo: BookingInfo;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingState {
  bookingInfo: Partial<BookingInfo>;
  currentBooking: Booking | null;
  loading: boolean;
  error: string | null;
  bookingStep: number;
}

const initialState: BookingState = {
  bookingInfo: {},
  currentBooking: null,
  loading: false,
  error: null,
  bookingStep: 1,
};

// Async thunks
export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: BookingInfo) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, bookingData);
    return response.data;
  }
);

export const fetchBooking = createAsyncThunk(
  'booking/fetchBooking',
  async (bookingId: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateBookingInfo: (state, action: PayloadAction<Partial<BookingInfo>>) => {
      state.bookingInfo = { ...state.bookingInfo, ...action.payload };
    },
    clearBookingInfo: (state) => {
      state.bookingInfo = {};
      state.bookingStep = 1;
    },
    setBookingStep: (state, action: PayloadAction<number>) => {
      state.bookingStep = action.payload;
    },
    nextBookingStep: (state) => {
      state.bookingStep += 1;
    },
    previousBookingStep: (state) => {
      state.bookingStep = Math.max(1, state.bookingStep - 1);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.bookingInfo = {};
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create booking';
      })
      // Fetch booking
      .addCase(fetchBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(fetchBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch booking';
      });
  },
});

export const {
  updateBookingInfo,
  clearBookingInfo,
  setBookingStep,
  nextBookingStep,
  previousBookingStep,
  clearError,
} = bookingSlice.actions;

export default bookingSlice.reducer;