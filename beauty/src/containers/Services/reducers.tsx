import {
  FETCH_SERVICES,
  FETCH_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  SERVICE_LOADING,
} from './constants'

const initialState = {
  loading: false,
  services: [] as any[],
  service: null as any,
  error: null as string | null,
  success: false
}

type actionProps = {
  type: string
  payload?: any
}

export default function serviceReducer(state = initialState, action: actionProps) {
  switch (action.type) {
    case SERVICE_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case FETCH_SERVICES:
      return {
        ...state,
        services: action.payload,
        loading: false
      }
    case FETCH_SERVICE:
      return {
        ...state,
        service: action.payload,
        loading: false
      }
    case CREATE_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload],
        service: action.payload,
        success: true,
        loading: false
      }
    case UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map(s =>
          s._id === action.payload._id ? action.payload : s
        ),
        service: action.payload,
        success: true,
        loading: false
      }
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(s => s._id !== action.payload),
        success: true,
        loading: false
      }
    default:
      return state
  }
}


