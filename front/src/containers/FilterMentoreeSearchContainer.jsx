import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { matrixLog } from "../utilities";
import { getSkillsList } from "../redux/action-creators/skills";
import {
  putSkillsToTeach,
  putSkillsToLearn,
} from "../redux/action-creators/currentUser";
import SelectSkills from "../components/SelectSkills/SelectSkills";
import AlertSnackBar from "../utilities/alertSnackbar";

function SelectSkillsContainer() {
  matrixLog("FILTER MENTOREE SEARCH CONTAINER");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const skillsToLearn = useSelector((state) => state.currentUser.skillsToLearn);
  const skillsToTeach = useSelector((state) => state.currentUser.skillsToTeach);
  const skillsList = useSelector((state) => state.skills);
  const option = location.state.option


  const [selectedSkillsToLearn, setSelectedSkillsToLearn] = useState([]);
  const [selectedSkillsToTeach, setSelectedSkillsToTeach] = useState([]);
  const skills = option === "mentor" ? skillsToLearn : skillsToTeach;
  const selectedSkills =
    option === "mentor" ? selectedSkillsToLearn : selectedSkillsToTeach;
  const setSelectedSkill =
    option === "mentor" ? setSelectedSkillsToLearn : setSelectedSkillsToTeach;
  const putSkills = option === "mentor" ? putSkillsToLearn : putSkillsToTeach;
  const title = option === "mentor" ? "BUSCAR MENTOR" : "BUSCAR MENTEES";
  const subtitle =
    option === "mentor" ? "¿Qué quieres aprender?" : "¿Qué quieres enseñar?";
  const [snackBar, setSnackBar] = useState("");

  const redirect = useCallback(
    (to) => history.push({ pathname: `/find/${to}`, search: "" }),
    [history]
  ); // aca en el search pueden ir filtros

  useEffect(() => {
    if (!location.state.changeSearch && skills.length) redirect(option);
  }, [location.state, skills.length, redirect, option]);

  useEffect(() => {
    if (!skillsList.length) dispatch(getSkillsList());
  }, [dispatch, skillsList.length]);

  const handleSubmit = () => {
    if (!selectedSkills.length)
      setSnackBar({
        msg: `Debes ingresar al menos una habilidad!`,
        key: Math.random(),
        type: "error",
      });
    else dispatch(putSkills(selectedSkills)).then(() => redirect(option));
  };

  const handleChange = (e, v) => {
    setSnackBar("");
    setSelectedSkill(v);
  };

  return (
    <div className="searchMentorContainer">
      <h1> {title} </h1>
      <SelectSkills
        subtitle={subtitle}
        skillsList={skillsList.length ? skillsList : []}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        snackBar={snackBar}
      />

      {snackBar ? (
        <AlertSnackBar
          key={snackBar.key}
          message={snackBar.msg}
          type={snackBar.type}
        />
      ) : null}
    </div>
  );
}
export default SelectSkillsContainer;
