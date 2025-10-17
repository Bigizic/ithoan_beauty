import { Dispatch, bindActionCreators } from 'redux'
import * as services from './containers/Services/actions'
import * as booking from './containers/Booking/actions'
import * as payment from './containers/PaymentGateway/actions'
import * as homepage from './containers/HomePage/actions'

export const actions = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...services,
      ...booking,
      ...payment,
      ...homepage,
    },
    dispatch
  )
}

export type ACTIONSTYPE = ReturnType<typeof actions>
