import { GET_NOTIFICATIONS } from "../constants"

const initialState = []

function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.payload
    default:
      return state
  }
}
export default notificationsReducer
