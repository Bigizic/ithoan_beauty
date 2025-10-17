import toast from "react-hot-toast";
import API_URL from "../../API_URL";
import {
  HOME_PAGE_LOADING,
  SET_USER_MAINTENANCE_STATUS,
  SET_USER_MAINTENANCE_TEXT,
  TOOGLE_HEADER_SEARCH,
} from "./constants";

export const toogleSearch = (value: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: TOOGLE_HEADER_SEARCH,
      payload: value
    })
  }
}

export const setHomePageLoading = (value: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: HOME_PAGE_LOADING,
      payload: value
    })
  }
}

export const getMaintenanceStats = () => {
  return async (dispatch: any) => {
    dispatch(setHomePageLoading(true))
    try {
      const { status, data } = await API_URL.get({ type: '/setting/user' });
      if (status === 200) {
        dispatch({
          type: SET_USER_MAINTENANCE_STATUS,
          payload: data.setting[0].isMaintenanceMode.beauty
        });
        return dispatch({
          type: SET_USER_MAINTENANCE_TEXT,
          payload: data.setting[0].maintenanceText.beauty
        })
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch site maintenance status'
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
          fontFamily: 'Poppins, Helvetica',
        }
      })
    } finally {
      dispatch(setHomePageLoading(false))
    }
  }
}