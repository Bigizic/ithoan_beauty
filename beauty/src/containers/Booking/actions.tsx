import API_URL from '../../API_URL'
import toast from 'react-hot-toast'
import {
  SET_SELECTED_SERVICE,
  SET_SELECTED_SUBSERVICE,
  SET_BOOKING_DATE,
  SET_BOOKING_TIME,
  FETCH_AVAILABLE_TIMES,
  CREATE_BOOKING,
  BOOKING_LOADING,
  SET_BOOKING_ERROR,
  CLEAR_BOOKING_ERROR,
  SET_USER_INFO,
  SET_FIELD_ERROR,
  CLEAR_FIELD_ERROR,
  RESET_BOOKING,
  FETCH_BANKS,
} from './constants'
import { togglePayment, setBookingId } from '../PaymentGateway/actions'

const setLoading = (value: boolean) => ({
  type: BOOKING_LOADING,
  payload: value
})

const setError = (error: string) => ({
  type: SET_BOOKING_ERROR,
  payload: error
})

export const clearError = () => ({
  type: CLEAR_BOOKING_ERROR
})

export const setFieldError = (field: string, error: string) => ({
  type: SET_FIELD_ERROR,
  payload: { field, error }
})

export const clearFieldError = (field: string) => ({
  type: CLEAR_FIELD_ERROR,
  payload: field
})

export const setSelectedService = (service: any) => (dispatch: any) => {
  dispatch({
    type: SET_SELECTED_SERVICE,
    payload: service
  })
}

export const setSelectedSubService = (subService: any) => (dispatch: any) => {
  dispatch({
    type: SET_SELECTED_SUBSERVICE,
    payload: subService
  })
}

export const setBookingDate = (date: Date) => (dispatch: any) => {
  dispatch({
    type: SET_BOOKING_DATE,
    payload: date
  })
}

export const setBookingTime = (time: string) => (dispatch: any) => {
  dispatch({
    type: SET_BOOKING_TIME,
    payload: time
  })
}

export const setUserInfo = (userInfo: any) => (dispatch: any) => {
  dispatch({
    type: SET_USER_INFO,
    payload: userInfo
  })
}

export const fetchAvailableTimes = (subServiceId: string, date: Date) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const data = await API_URL.get({
      type: '/booking/available-times',
      params: {
        subServiceId,
        date
      }
    })

    if (data.availableTimes.length === 0) {
      toast.error(data.message || 'No available bookings on this day', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          fontFamily: 'Poppins, Helvetica',
        }
      })
    }

    dispatch({
      type: FETCH_AVAILABLE_TIMES,
      payload: {
        availableTimes: data.availableTimes
      }
    })
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to fetch available times'
    toast.error(errorMessage, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#f44336',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })
    dispatch(setLoading(false))
  }
}

export const createBooking = (bookingData: any) => async (dispatch: any) => {
  const { selectedService, selectedSubService, bookingDate, bookingTime, userInfo } = bookingData

  dispatch(clearFieldError('fullName'))
  dispatch(clearFieldError('email'))
  dispatch(clearFieldError('phoneNumber'))

  let hasError = false

  if (!selectedService) {
    toast.error('Please select a service', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#f44336',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })
    return
  }

  if (!selectedSubService) {
    toast.error(`Please select a sub service under the ${selectedService.name} selection`, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#f44336',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })
    return
  }

  if (!bookingDate) {
    toast.error('Please select a booking date', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#f44336',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })
    return
  }

  if (!bookingTime) {
    toast.error('Please select a booking time', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#f44336',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })
    return
  }

  if (!userInfo.fullName) {
    dispatch(setFieldError('fullName', 'Full name is required'))
    hasError = true
  }

  if (!userInfo.email) {
    dispatch(setFieldError('email', 'Email is required'))
    hasError = true
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userInfo.email)) {
      dispatch(setFieldError('email', 'Please enter a valid email address'))
      hasError = true
    }
  }

  if (!userInfo.phoneNumber) {
    dispatch(setFieldError('phoneNumber', 'Phone number is required'))
    hasError = true
  } else {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    if (!phoneRegex.test(userInfo.phoneNumber)) {
      dispatch(setFieldError('phoneNumber', 'Please enter a valid phone number'))
      hasError = true
    }
  }

  if (hasError) {
    return
  }

  dispatch(setLoading(true))
  try {
    const data = await API_URL.post({
      type: '/booking/create',
      data: {
        serviceId: selectedService._id,
        subServiceId: selectedSubService._id,
        bookingDate,
        bookingTime,
        fullName: userInfo.fullName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber
      }
    })

    toast.success('Booking created successfully!', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#4caf50',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })

    dispatch({
      type: CREATE_BOOKING,
      payload: data.booking
    })
    await dispatch(fetchBanks())
    dispatch(setBookingId(data.booking._id))
    dispatch(togglePayment())
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || 'Failed to create booking'
    toast.error(errorMessage, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#f44336',
        color: '#fff',
        fontFamily: 'Poppins, Helvetica',
      }
    })
    dispatch(setLoading(false))
  }
}

export const fetchBanks = () => async (dispatch: any) => {
  try {
    const data = await API_URL.get({
      type: '/account/banks'
    })
    dispatch({
      type: FETCH_BANKS,
      payload: data.banks || []
    })
  } catch (err: any) {
    console.error('Failed to fetch banks:', err)
  }
}

export const resetBooking = () => (dispatch: any) => {
  dispatch({
    type: RESET_BOOKING
  })
}
