import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MyProfile from "./MyProfile";

export default () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [name, setName] = React.useState("");
  const [editProfile, setEditProfile] = React.useState(false);
  const [meeting, setMeeting] = React.useState(false);
  const [skillsToLearnOrTeach, setSkillsToLearnOrTeach] = React.useState(false);
  const [menteesOrMentors, setMenteesOrMentors] = React.useState(false);
  const [matching, setMatching] = React.useState(false);

  const [skill, setSkill] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  // const [userInfo,setUserInfo]=useState([])

  const handleSkill = (e) => {
    setSkill(!skill);
    setEdit(false);
  };

  const handleEdit = (e) => {
    setEdit(!edit);
    setSkill(false);
  };

  const handleClick = (e) => {
    if (name === "editProfile") {
      if (editProfile) {
        setEditProfile(false);
      } else {
        setEditProfile(true);
        setMeeting(false);
        setSkillsToLearnOrTeach(false);
        setMenteesOrMentors(false);
        setMatching(false);
      }
    } else if (name === "meeting") {
      if (meeting) setMeeting(false);
      else {
        setEditProfile(false);
        setMeeting(true);
        setSkillsToLearnOrTeach(false);
        setMenteesOrMentors(false);
        setMatching(false);
      }
    } else if (name === "skillsToLearnOrTeach") {
      if (skillsToLearnOrTeach) setSkillsToLearnOrTeach(false);
      else {
        setSkillsToLearnOrTeach(true);
        setEditProfile(false);
        setMeeting(false);
        setMenteesOrMentors(false);
        setMatching(false);
      }
    } else if (name === "menteesOrMentors") {
      if (menteesOrMentors) setMenteesOrMentors(false);
      else {
        setMenteesOrMentors(true);
        setSkillsToLearnOrTeach(false);
        setEditProfile(false);
        setMeeting(false);
        setMatching(false);
      }
    } else if (name === "matching") {
      if (matching) setMatching(false);
      else {
        setMatching(true);
        setMenteesOrMentors(false);
        setSkillsToLearnOrTeach(false);
        setEditProfile(false);
        setMeeting(false);
      }
    }
  };

  return currentUser._id ? (
    <MyProfile
      user={currentUser}
      handleClick={handleClick}
      editProfile={editProfile}
      meeting={meeting}
      skillsToLearnOrTeach={skillsToLearnOrTeach}
      menteesOrMentors={menteesOrMentors}
      matching={matching}
      setName={setName}
      skill={skill}
      handleSkill={handleSkill}
      edit={edit}
      handleEdit={handleEdit}
    />
  ) : null;
};
// }
