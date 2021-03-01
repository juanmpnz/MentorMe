import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MenteePage from "../components/Mentees/MenteePage";

export default function MenteeIndividual() {
  const userId = useSelector((state) => state.currentUser._id);
  const mentees = useSelector((state) => state.currentUser.mentees);
  const { id } = useParams();
  const [obj, setObj] = useState({ name: "" });
  const [meet, setMeet] = useState({ text: "", link: "", date: "" });
  const [rows, setRows] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
  });

  React.useEffect(async () => {
    const selectedMentee = await axios.get(`/api/users/${id}`).then(res => res.data)
    setRows({
      firstName: selectedMentee.firstName,
      lastName: selectedMentee.lastName,
      email: selectedMentee.email,
      country: selectedMentee.country,
    });
  }, [id]);

  const handleChangeMeet = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(value);
    setMeet({ ...meet, [e.target.name]: value });
    console.log(e.target.value);
    console.log("meet", meet);
  };

  const handleChangeObjetive = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setObj({ ...obj, [e.target.name]: value });
    console.log(obj);
  };

  const handleSubmitObjective = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/${userId}/mentees/${id}/objectives`, obj)
      .then((rta) => console.log("objetivo posteado", rta))
      .catch((err) => console.log(err));

    setObj({ name: "" });
  };

  const handleSubmitMeet = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users/${userId}/mentees/${id}/meetings`, meet)
      .then((rta) => console.log("meet posteado", rta))
      .catch((err) => console.log(err));

    setMeet({ text: "", link: "", date: "" });
  };
  return (
    <MenteePage
      handleChangeMeet={handleChangeMeet}
      handleChangeObjetive={handleChangeObjetive}
      handleSubmitObjective={handleSubmitObjective}
      handleSubmitMeet={handleSubmitMeet}
      meet={meet}
      rows={rows}
      obj={obj}
    />
  );
}
