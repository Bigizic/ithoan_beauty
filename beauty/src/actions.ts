import { Dispatch, bindActionCreators } from 'redux'
import * as services from './containers/Services/actions'
import * as booking from './containers/Booking/actions'
import * as payment from './containers/PaymentGateway/actions'

export const actions = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...services,
      ...booking,
      ...payment
    },
    dispatch
  )
}

export type ACTIONSTYPE = ReturnType<typeof actions>
