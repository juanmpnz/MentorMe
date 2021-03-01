import { GET_ALL_USERS, GET_ALL_MENTORS, GET_ALL_MENTEES } from "../constants"

const initialState = []

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.payload
    case GET_ALL_MENTORS:
      return { ...state, mentors: action.payload }
    case GET_ALL_MENTEES:
      return { ...state, mentees: action.payload }
    default:
      return state
  }
}
export default usersReducer
