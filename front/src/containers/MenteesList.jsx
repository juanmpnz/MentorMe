import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import MyMenteesCards from "../components/Mentees/MyMenteesCards";

export default function MyMentees() {
  const currentUser = useSelector((state) => state.currentUser);
  /* const myMentees = currentUser.mentees || []; */
  const [mentees, setMentees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {

    let getMentees = await Promise.all(
      currentUser.mentees.map(mentee => {
        return axios.get(`/api/users/${mentee._id}`
        )
          .then(res => {
            console.log("res.data", res.data)
            return res.data

          })

      }))

    setMentees(getMentees)
    setLoading(false)

  }, [])

  if (loading) return null
  else return <MyMenteesCards mentees={mentees} />;
}
