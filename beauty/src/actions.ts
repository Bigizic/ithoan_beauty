import { Dispatch, bindActionCreators } from 'redux'
import * as services from './containers/Services/actions'
import * as booking from './containers/Booking/actions'

export const actions = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...services,
      ...booking
    },
    dispatch
  )
}

export type ACTIONSTYPE = ReturnType<typeof actions>
