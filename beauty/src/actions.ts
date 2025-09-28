import { Dispatch, bindActionCreators } from 'redux'
import * as services from './containers/Services/actions'

export const actions = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...services
    },
    dispatch
  )
}

export type ACTIONSTYPE = ReturnType<typeof actions>
