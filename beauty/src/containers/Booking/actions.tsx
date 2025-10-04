import API_URL from '../../API_URL'
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
  RESET_BOOKING,
} from './constants'

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
        date: date.toISOString()
      }
    })
    dispatch({
      type: FETCH_AVAILABLE_TIMES,
      payload: {
        availableTimes: data.availableTimes,
        bookedDates: data.bookedDates
      }
    })
  } catch (err: any) {
    dispatch(setError(err.response?.data?.error || 'Failed to fetch available times'))
    dispatch(setLoading(false))
  }
}

export const createBooking = (bookingData: any) => async (dispatch: any) => {
  const { selectedService, selectedSubService, bookingDate, bookingTime, userInfo } = bookingData

  if (!selectedService) {
    dispatch(setError('Please select a service'))
    return
  }

  if (!selectedSubService) {
    dispatch(setError(`Please select a sub service under the ${selectedService.name} selection`))
    return
  }

  if (!bookingDate) {
    dispatch(setError('Please select a booking date'))
    return
  }

  if (!bookingTime) {
    dispatch(setError('Please select a booking time'))
    return
  }

  if (!userInfo.fullName || !userInfo.email || !userInfo.phoneNumber) {
    dispatch(setError('Please fill in all your information'))
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userInfo.email)) {
    dispatch(setError('Please enter a valid email address'))
    return
  }

  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
  if (!phoneRegex.test(userInfo.phoneNumber)) {
    dispatch(setError('Please enter a valid phone number'))
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
    dispatch({
      type: CREATE_BOOKING,
      payload: data.booking
    })
  } catch (err: any) {
    dispatch(setError(err.response?.data?.error || 'Failed to create booking'))
    dispatch(setLoading(false))
  }
}

export const resetBooking = () => (dispatch: any) => {
  dispatch({
    type: RESET_BOOKING
  })
}
