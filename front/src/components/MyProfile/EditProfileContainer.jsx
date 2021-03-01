import Axios from "axios"
import React, { useState } from "react"

import EditProfile from "./utils/EditProfile"

export default function EditProfileContainer({ user }) {
  const [snackBar, setSnackBar] = React.useState("")
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)

  const handleSubmit = (e) => {
    const userObj = { firstName, lastName, phoneNumber }
    e.preventDefault()
    Axios.put(`/api/users/${user._id}`, userObj).then(() =>
      setSnackBar({ msg: `Usuario actualizado !`, key: Math.random(), type: "success" })
    )
  }

  const handleChange = (e) => {
    const value = e.target.value
    if (e.target.name === "firstName") setFirstName(value)
    else if (e.target.name === "lastName") setLastName(value)
    else if (e.target.name === "phoneNumber") {
      setPhoneNumber(value)
    }
  }

  return (
    <EditProfile
      user={user}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      firstName={firstName}
      lastName={lastName}
      phoneNumer={phoneNumber}
      snackBar={snackBar}
    />
  )
}
