import {
  FETCH_SURVEYS,
  SET_SURVEYS_LOADING,
  SET_SURVEY_STATS
} from './constants';

const initialState = {
  surveys: [],
  stats: [],
  isLoading: false,
  totalCount: 0,
  totalPages: 0,
  currentPage: 1
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return {
        ...state,
        surveys: action.payload.surveys,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage
      };
    case SET_SURVEYS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_SURVEY_STATS:
      return {
        ...state,
        stats: action.payload
      };
    default:
      return state;
  }
};

export default surveyReducer;
