import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import MyMentors from "../components/MyMentors/MyMentors";

const MyMentorsContainer = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {

    let getMentors = await Promise.all(
      currentUser.mentors.map(mentor => {

        return axios.get(`/api/users/${mentor._id}`
        )
          .then(res => {
            console.log("res.data", res.data)
            return res.data

          })

      }))

    setMentors(getMentors)
    setLoading(false)

  }, [])

  if (loading) return null
  else return <MyMentors mentors={mentors} />;

};

export default () => {
  const currentUser = useSelector((state) => state.currentUser);
  if (currentUser.mentors.length) return <MyMentorsContainer />
  else return <div className="content">No tienes ningún mentor</div>
}

