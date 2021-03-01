/* eslint-disable import/prefer-default-export */
import axios from "axios"
import { GET_NOTIFICATIONS } from "../constants"
import { errorLogger } from "../../utilities"

export const getNotifications = () => (dispatch, getState) => {
  const userId = getState().currentUser._id
  console.log("userId",userId)
  return axios
    .get(`/api/users/${userId}/notifications`)
    .then((res) => {
      console.log(res.data)
      dispatch({ type: GET_NOTIFICATIONS, payload: res.data })
    })
    .catch((err) => errorLogger(err))
}
