import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import MyMentor from "../components/MyMentors/MyMentor"

function MyMentorContainer() {
  const mentors = useSelector((state) => state.currentUser.mentors)
  const mentorId = useParams().id
  const selectedMentor = mentors.find((e) => e._id === mentorId)
  const userId = useSelector((state) => state.currentUser._id)
  const [objectives, setObjectives] = React.useState([])

  React.useEffect(() => {
    axios.get(`/api/users/${userId}/mentors/${mentorId}/objectives/`).then((data) => setObjectives(data.data))
  }, [userId, mentorId])

  async function handleSelect(objectiveId) {
    await axios.patch(`/api/users/${userId}/mentors/${mentorId}/objectives/${objectiveId}/changeStatus`).then(() => {
      axios.get(`/api/users/${userId}/mentors/${mentorId}/objectives/`).then(({ data }) => {
        setObjectives(data)
      })
    })
  }

  if (selectedMentor) {
    return (
      <MyMentor mentors={mentors} handleSelect={handleSelect} selectedMentor={selectedMentor} objectives={objectives} />
    )
  }
  return null
}
export default MyMentorContainer
