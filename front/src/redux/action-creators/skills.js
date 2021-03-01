/* eslint-disable import/prefer-default-export */
import axios from "axios"
import { GET_SKILLS_LIST } from "../constants"

export function getSkillsList() {
  return (dispatch) => {
    axios.get("/api/skills/").then((res) => {
      dispatch({ type: GET_SKILLS_LIST, payload: res.data })
    })
  }
}
