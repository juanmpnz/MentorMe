import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { matrixLog } from "../utilities"

import FindMentoree from "../components/FindMentoree/FindMentoree"

function FindMentoreeContainer() {
  matrixLog("FIND MENTOREE CONTAINER")
  const path = useLocation().pathname

  const currentUser = useSelector((state) => state.currentUser) // usuario que esta logueado
  const [mentors, setMentors] = useState([{ _id: 0 }]) // meto los user que matchearon
  const [positionMentoreeOne, setPositionMentoreeOne] = useState(0) // muestro el primero de la lista mentores
  const [positionMentoreeTwo, setPositionMentoreeTwo] = useState(1) // muestro el segundo de la lista mentores
  const [selectedMentor, setSelectedMentor] = useState({ _id: 0 }) // guardo el mentor ganandor en el match
  const [clickCardOne, setClickCardOne] = useState(1)
  const [clickCardTwo, setClickCardTwo] = useState(1)
  const [snackBar, setSnackBar] = useState("")
  const userId = currentUser._id // id del usuario logueado
  const firstName = currentUser.firstName // id del usuario logueado
  const lastName = currentUser.lastName // id del usuario logueado
  const mentoreeOne = mentors[positionMentoreeOne] || []
  const mentoreeTwo = mentors[positionMentoreeTwo] || []
  const option = path === "/find/mentor" ? "mentor" : "mentee"

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/users/${userId}/${option}s/match`)
        .then(({ data }) => {
          console.log(data)
          setMentors(data)
        })
        .catch((err) => console.error(err))
    }
  }, [userId, option])

  // TARJETA UNO
  function handleClickMentoreeOne(e) {
    e.preventDefault()
    if (clickCardOne < 2) {
      setClickCardOne(clickCardOne + 1)
    } else {
      setClickCardOne(1)
    }
    if (clickCardTwo > 1) setClickCardTwo(1)

    if (selectedMentor._id === mentoreeOne._id) {
      const mentoreeSkill = option === "mentor" ? "skillsToTeach" : "skillsToLearn"
      const userSkill = option === "mentor" ? "skillsToLearn" : "skillsToTeach"
      let teachingSkills = []
      mentoreeOne[mentoreeSkill].forEach((el) => {
        currentUser[userSkill].forEach((ele) => {
          if (el._id === ele._id) teachingSkills.push(el)
        })
      })
      teachingSkills = teachingSkills.map((el) => {
        return { _id: el._id, name: el.name }
      })

      axios
        .post(`/api/users/${userId}/${option}s/${mentoreeOne._id}/request`, { firstName, lastName, teachingSkills })
        .then(({ data }) => {
          setSnackBar({ msg: `Se ha enviado una solicitud al usuario`, key: Math.random(), type: "info" })
          console.log(data)
        })
        .catch((err) => console.log(err))

      setPositionMentoreeOne(positionMentoreeOne + 2)
    } else {
      setSelectedMentor(mentoreeOne)
      setPositionMentoreeTwo(positionMentoreeTwo + 2)
    }
  }

  // TARJETA DOS
  const handleClickMentoreeTwo = (e) => {
    e.preventDefault()
    if (clickCardTwo < 2) {
      setClickCardTwo(clickCardTwo + 1)
    } else {
      setClickCardTwo(1)
    }
    if (clickCardOne > 1) setClickCardOne(1)
    if (selectedMentor._id === mentoreeTwo._id) {
      const mentoreeSkill = option === "mentor" ? "skillsToTeach" : "skillsToLearn"
      const userSkill = option === "mentor" ? "skillsToLearn" : "skillsToTeach"
      let teachingSkills = []
      mentoreeTwo[mentoreeSkill].forEach((el) => {
        currentUser[userSkill].forEach((ele) => {
          if (el._id === ele._id) teachingSkills.push(el)
        })
      })
      teachingSkills = teachingSkills.map((el) => {
        return { _id: el._id, name: el.name }
      })
      console.log(teachingSkills)

      axios
        .post(`/api/users/${userId}/${option}s/${mentoreeTwo._id}/request`, { firstName, lastName, teachingSkills })
        .then(({ data }) => {
          setSnackBar({ msg: `Se ha enviado una solicitud al usuario`, key: Math.random(), type: "info" })
          console.log(data)
        })
        .catch((err) => console.log(err))

      setPositionMentoreeTwo(positionMentoreeOne + 2)
    } else {
      setSelectedMentor(mentoreeTwo)
      setPositionMentoreeOne(positionMentoreeOne + 2)
    }
  }

  return (
    <FindMentoree
      option={option}
      clickCardOne={clickCardOne}
      clickCardTwo={clickCardTwo}
      mentoreeOne={mentoreeOne}
      mentoreeTwo={mentoreeTwo}
      handleClickMentoreeOne={handleClickMentoreeOne}
      handleClickMentoreeTwo={handleClickMentoreeTwo}
      skillsToTeachOrLearn={
        path === "/find/mentor"
          ? currentUser.skillsToLearn.map((e) => ` ${e.name}`)
          : currentUser.skillsToTeach.map((e) => ` ${e.name}`)
      }
      snackBar={snackBar}
    />
  )
}
export default FindMentoreeContainer
