import API_URL from '../../API_URL'
import { resetBooking } from '../Booking/actions'
import {
  SET_BOOKING_ID,
  TOGGLE_PAYMENT,
  SET_PAYMENT_RECEIPTS,
  RESET_PAYMENT_RECEIPTS,
  PAYMENT_IS_LOADING,
  PAYMENT_FORM_ERRORS,
  SET_BANK_COPIED,
  SET_PAYMENT_NOTE
} from './constants'
import imageCompression from 'browser-image-compression'

export const togglePayment = () => (dispatch: any) => {
  dispatch({
    type: TOGGLE_PAYMENT
  })
}

export const setBookingId = (id: string) => (dispatch: any) => {
  dispatch({
    type: SET_BOOKING_ID,
    payload: id
  })
}

export const resetPaymentReceipts = () => (dispatch: any) => {
  dispatch({
    type: RESET_PAYMENT_RECEIPTS
  })
}

export const setPaymentIsLoading = (status: boolean) => (dispatch: any) => {
  dispatch({
    type: PAYMENT_IS_LOADING,
    payload: status
  })
}

export const setPaymentNote = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_PAYMENT_NOTE,
    payload: value
  })
}

export const setPaymentFormError = (error: string) => (dispatch: any) => {
  dispatch({
    type: PAYMENT_FORM_ERRORS,
    payload: error
  })
}

export const handleBankCopy = (accountNumber: string) => (dispatch: any) => {
  navigator.clipboard.writeText(accountNumber)
    .then(() => {
      dispatch({
        type: SET_BANK_COPIED,
        payload: accountNumber
      })

      setTimeout(() => {
        dispatch({
          type: SET_BANK_COPIED,
          payload: null
        })
      }, 2000)
    })
    .catch((err) => {
      console.error('Failed to copy to clipboard: ', err)
    })
}

export const setPaymentReceipt = (images: File[]) => async (dispatch: any, getState: any) => {
  try {
    const state = getState()
    const existingImages = state.payment.paymentReceipts || []

    const combinedImages = [...existingImages, ...images].slice(0, 1)

    const validImages = combinedImages.filter((img: File) => {
      return ['image/png', 'image/jpeg', 'image/jpg'].includes(img.type)
    })

    if (validImages.length !== combinedImages.length) {
      dispatch(setPaymentFormError('Please upload files with jpg, jpeg, png format.'))
      return
    }

    dispatch({
      type: SET_PAYMENT_RECEIPTS,
      payload: validImages
    })
  } catch (error) {
    dispatch(setPaymentFormError('Error uploading image'))
  }
}

export const handleImageUpload = (e: any) => async (dispatch: any, getState: any) => {
  if (e) {
    const files = [e.file]
    const paymentReceipts = getState().payment.paymentReceipts

    if (paymentReceipts.length + files.length > 1) {
      return dispatch(setPaymentFormError('You can upload up to 1 image only.'))
    }

    try {
      const compressedImages = await Promise.all(
        files.map(async (file: File) => {
          const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1024,
            useWebWorker: true
          }
          return await imageCompression(file, options)
        })
      )

      dispatch(setPaymentReceipt([...compressedImages]))
      dispatch(setPaymentFormError(''))
    } catch (err) {
      dispatch(setPaymentFormError('Failed to compress image. Please try again.'))
    }
  } else {
    const paymentReceipts = getState().payment.paymentReceipts
    if (paymentReceipts.length > 0) {
      dispatch(resetPaymentReceipts())
    }
  }
}

export const handlePaymentCheckout = (navigate: any) => (dispatch: any, getState: any) => {
  try {
    const bookingId = getState().payment.bookingId
    const paymentReceipts = getState().payment.paymentReceipts

    if (paymentReceipts.length === 0) {
      return dispatch(setPaymentFormError('You must upload at least one image.'))
    }
    dispatch(setPaymentFormError(''))
    dispatch(setPaymentIsLoading(true))
    dispatch(submitBookingPayment(bookingId, paymentReceipts, navigate))
  } catch (error) {
    dispatch(setPaymentFormError('Error processing payment'))
  }
}

export const submitBookingPayment = (bookingId: string, paymentReceipts: File[], navigate: any) => async (dispatch: any, getState: any) => {
  try {
    const formData = new FormData()
    const note = getState().payment.note

    formData.append('bookingId', bookingId)
    formData.append('note', note)

    paymentReceipts.forEach((image, index) => {
      const renamedFile = new File([image], `booking_${bookingId}_.png`, { type: image.type })
      formData.append(`image_${index}`, renamedFile)
    })

    const data = await API_URL.put({
      type: '/booking/payment',
      data: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })

    if (data.success) {
      dispatch(setPaymentIsLoading(false))
      dispatch(togglePayment())
      dispatch(resetPaymentReceipts())
      dispatch(resetBooking())
      navigate(`/booking/success/${data.booking.bookingHash}`)
    }
  } catch (error: any) {
    dispatch(setPaymentFormError(error.response?.data?.error || 'Failed to process payment'))
    dispatch(setPaymentIsLoading(false))
  }
}

export const closePaymentModal = (navigate?: any) => (dispatch: any) => {
  dispatch(togglePayment())
  dispatch(resetPaymentReceipts())
}
