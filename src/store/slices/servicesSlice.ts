import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  duration: number;
  image: string;
  benefits: string[];
  process: string[];
}

interface ServicesState {
  services: Service[];
  currentService: Service | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
    return response.data;
  }
);

export const fetchServiceBySlug = createAsyncThunk(
  'services/fetchServiceBySlug',
  async (slug: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`);
    return response.data;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearCurrentService: (state) => {
      state.currentService = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      })
      // Fetch service by slug
      .addCase(fetchServiceBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action: PayloadAction<Service>) => {
        state.loading = false;
        state.currentService = action.payload;
      })
      .addCase(fetchServiceBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch service';
      });
  },
});

export const { clearCurrentService, clearError } = servicesSlice.actions;
export default servicesSlice.reducer;