import axios from "axios"
import { LOGIN } from "../constants"
import { errorLogger } from "../../utilities"

export function register(user) {
  return axios
    .post("/api/auth/register", user)
    .then(() => console.log("User created succesfully!"))
    .catch((err) => errorLogger(err))
}

export function login(email, password) {
  return (dispatch) =>
    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        dispatch({ type: LOGIN, payload: res.data.user })
        document.cookie = `token=${res.data.token}`
      })
      .catch((err) => {
        errorLogger(err)
        return "err"
      })
}

export function me(token) {
  return (dispatch) => {
    return axios
      .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => dispatch({ type: "ME_LOGIN", payload: res.data }))
      .catch((err) => errorLogger(err))
  }
}

export const logout = () => (dispatch) => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  return dispatch({ type: "LOGOUT", payload: {} })
}

export const putSkillsToTeach = (selectedSkills) => (dispatch, getState) => {
  const userId = getState().currentUser._id

  return axios
    .put(`/api/users/${userId}/putSkillsToTeach`, selectedSkills)
    .then((res) => dispatch({ type: "UPDATE_SKILLS_TO_TEACH", payload: res.data }))
    .catch((err) => errorLogger(err))
}

export const putSkillsToLearn = (selectedSkills) => (dispatch, getState) => {
  const userId = getState().currentUser._id
  console.log(userId)
  return axios
    .put(`/api/users/${userId}/putSkillsToLearn`, selectedSkills)
    .then((res) => dispatch({ type: "UPDATE_SKILLS_TO_LEARN", payload: res.data }))
    .catch((err) => errorLogger(err))
}

export const postMentor = (selectedMentor) => (dispatch, getState) => {
  const userId = getState().currentUser._id
  axios
    .post(`/api/users/${userId}/mentors/add`, selectedMentor)
    .then((res) => dispatch({ type: "ADD_MENTOR", payload: res.data }))
    .catch((err) => errorLogger(err))
}

export const postMentee = (selectedMentee) => (dispatch, getState) => {
  const userId = getState().currentUser._id

  axios
    .post(`/api/users/${userId}/mentees/add`, selectedMentee)
    .then((res) => dispatch({ type: "ADD_MENTEE", payload: res.data }))
    .catch((err) => errorLogger(err))
}

const avatar = (link) => ({
  type: "UPDATE_AVATAR",
  payload: link,
})

export const setAvatar = (fileData) => (dispatch, getState) => {
  const userId = getState().currentUser._id
  axios
    .post(`/api/users/${userId}/uploadAvatar`, fileData)
    .then((res) => {
      console.log(res.data.avatar)
      dispatch(avatar(res.data.avatar))
    })
    .catch((err) => console.log(err))
}
