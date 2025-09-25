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

// Mock data for development - replace with actual API calls
const mockServices: Service[] = [
  {
    id: '1',
    slug: 'facial-treatment',
    title: 'Revitalize Your Skin',
    category: 'Facials',
    description: 'Customized treatments for radiant skin.',
    longDescription: 'Our signature facial treatment combines deep cleansing, exfoliation, and nourishing masks to reveal your skin\'s natural glow. Each treatment is customized to your specific skin type and concerns.',
    price: 85,
    duration: 60,
    image: '/images/home_page/offerings/offering_1.jpg',
    benefits: [
      'Deep cleansing and pore purification',
      'Improved skin texture and tone',
      'Reduced signs of aging',
      'Enhanced natural glow',
      'Relaxation and stress relief'
    ],
    process: [
      'Skin analysis and consultation',
      'Deep cleansing and steam treatment',
      'Gentle exfoliation',
      'Custom mask application',
      'Moisturizing and sun protection'
    ]
  },
  {
    id: '2',
    slug: 'massage-therapy',
    title: 'Relax and Unwind',
    category: 'Massage',
    description: 'Experience ultimate relaxation with our massage therapy.',
    longDescription: 'Our therapeutic massage combines various techniques to relieve tension, improve circulation, and promote overall wellness. Perfect for stress relief and muscle recovery.',
    price: 95,
    duration: 90,
    image: '/images/home_page/offerings/offering_2.jpg',
    benefits: [
      'Stress and tension relief',
      'Improved circulation',
      'Muscle pain reduction',
      'Better sleep quality',
      'Enhanced mood and relaxation'
    ],
    process: [
      'Consultation and preference discussion',
      'Preparation and positioning',
      'Therapeutic massage techniques',
      'Focus on problem areas',
      'Relaxation and aftercare advice'
    ]
  },
  {
    id: '3',
    slug: 'waxing-service',
    title: 'Smooth and Silky',
    category: 'Waxing',
    description: 'Achieve flawless skin with our waxing services.',
    longDescription: 'Professional waxing services using high-quality, gentle wax for smooth, long-lasting results. Our experienced technicians ensure comfort and precision.',
    price: 45,
    duration: 30,
    image: '/images/home_page/offerings/offering_3.jpg',
    benefits: [
      'Long-lasting smooth skin',
      'Reduced hair regrowth over time',
      'Exfoliation benefits',
      'Professional precision',
      'Clean and hygienic process'
    ],
    process: [
      'Skin preparation and cleansing',
      'Application of pre-wax treatment',
      'Precise wax application',
      'Quick and efficient removal',
      'Soothing post-wax care'
    ]
  },
  {
    id: '4',
    slug: 'pedicure-treatment',
    title: 'Pamper Your Feet',
    category: 'Pedicure',
    description: 'Indulge in our rejuvenating pedicure treatments.',
    longDescription: 'Complete foot care treatment including soaking, exfoliation, nail care, and massage. Leave with beautifully groomed feet and relaxed muscles.',
    price: 55,
    duration: 45,
    image: '/images/home_page/offerings/offering_4.jpg',
    benefits: [
      'Improved foot health',
      'Soft, smooth skin',
      'Professional nail care',
      'Relaxing foot massage',
      'Enhanced appearance'
    ],
    process: [
      'Foot soaking and softening',
      'Nail trimming and shaping',
      'Cuticle care and treatment',
      'Exfoliation and scrubbing',
      'Massage and polish application'
    ]
  },
  {
    id: '5',
    slug: 'lash-enhancement',
    title: 'Enhance Your Natural Beauty',
    category: 'Lashes',
    description: 'Our lash services will give you a stunning look.',
    longDescription: 'Professional lash enhancement services including extensions, lifts, and tinting. Achieve the perfect lash look that complements your natural beauty.',
    price: 75,
    duration: 75,
    image: '/images/home_page/offerings/offering_5.jpg',
    benefits: [
      'Enhanced eye appearance',
      'Long-lasting results',
      'Natural-looking enhancement',
      'Time-saving daily routine',
      'Boosted confidence'
    ],
    process: [
      'Consultation and lash assessment',
      'Eye area preparation',
      'Precise application technique',
      'Quality check and adjustments',
      'Aftercare instructions'
    ]
  }
];
// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
      return response.data;
    } catch (error) {
      // Return mock data if API is not available
      console.log('Using mock data for services');
      return mockServices;
    }
  }
);

export const fetchServiceBySlug = createAsyncThunk(
  'services/fetchServiceBySlug',
  async (slug: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`);
      return response.data;
    } catch (error) {
      // Return mock data if API is not available
      console.log('Using mock data for service');
      const service = mockServices.find(s => s.slug === slug);
      if (!service) {
        throw new Error('Service not found');
      }
      return service;
    }
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