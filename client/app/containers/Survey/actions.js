import axios from 'axios';
import {
  FETCH_SURVEYS,
  SET_SURVEYS_LOADING,
  SET_SURVEY_STATS
} from './constants';
import handleError from '../../utils/error';
import { API_URL } from '../../constants';

export const fetchSurveys = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_SURVEYS_LOADING, payload: true });

      const response = await axios.get(`${API_URL}/survey/list?page=${page}&limit=50`);

      dispatch({
        type: FETCH_SURVEYS,
        payload: {
          surveys: response.data.surveys,
          totalCount: response.data.totalCount,
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage
        }
      });

      dispatch({
        type: SET_SURVEY_STATS,
        payload: response.data.stats
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_SURVEYS_LOADING, payload: false });
    }
  };
};
