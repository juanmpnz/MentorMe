import { combineReducers } from "redux"
import currentUserReducer from "./currentUser"
import usersReducer from "./users"
import skillsReducer from "./skills"
import notificationsReducer from "./notifications"

export default combineReducers({
  currentUser: currentUserReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  skills: skillsReducer,
})
