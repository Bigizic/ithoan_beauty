import API_URL from '../../API_URL'
import {
  FETCH_SERVICES,
  FETCH_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  SERVICE_LOADING,
} from './constants'

const setLoading = (value: boolean) => ({
  type: SERVICE_LOADING,
  payload: value
})

export const fetchServices = () => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const data = await API_URL.get({ type: 'services' })
    dispatch({
      type: FETCH_SERVICES,
      payload: data.services
    })
  } catch (err: any) {
    dispatch(setLoading(false))
  }
}

export const fetchService = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const data = await API_URL.get({ type: 'services', id })
    dispatch({
      type: FETCH_SERVICE,
      payload: data.service
    })
  } catch (err: any) {
    dispatch(setLoading(false))
  }
}

export const createService = (formData: any) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const data = await API_URL.post({
      type: 'services',
      data: formData,
      config: {
        headers: { 'Content-Type': 'application/json' }
      }
    })
    dispatch({
      type: CREATE_SERVICE,
      payload: data.service
    })
  } catch (err: any) {
    dispatch(setLoading(false))
  }
}

export const updateService = (id: string, formData: any) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    const data = await API_URL.put({
      type: 'services',
      id,
      data: formData,
      config: {
        headers: { 'Content-Type': 'application/json' }
      }
    })
    dispatch({
      type: UPDATE_SERVICE,
      payload: data.service
    })
  } catch (err: any) {
    dispatch(setLoading(false))
  }
}

export const deleteService = (id: string) => async (dispatch: any) => {
  dispatch(setLoading(true))
  try {
    await API_URL.delete({
      type: 'services',
      id,
      config: {
        headers: { 'Content-Type': 'application/json' }
      }
    })
    dispatch({
      type: DELETE_SERVICE,
      payload: id
    })
  } catch (err: any) {
    dispatch(setLoading(false))
  }
}
