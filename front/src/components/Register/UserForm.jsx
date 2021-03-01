import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormUserNew from "./components/FormUserNew";
import FormUserData from "./components/FormUserData";
import FormUserSkills from "./components/FormUserSkills";
import FormUserSave from "./components/FormUserSave";
import FormUserSuccess from "./components/FormUserSuccess";
import { getSkillsList } from "../../redux/action-creators/skills";
import { register } from "../../redux/action-creators/currentUser";

function UserForm() {
  const dispatch = useDispatch();
  const skillsList = useSelector((state) => state.skills);
  const steps = 3;
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [snackBar, setSnackBar] = React.useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    languages: [],
    avatar: "",
    skills: [],
    skillsToLearn: [],
    skillsToTeach: [],
    mentors: [],
    mentees: [],
    isAdmin: false,
  });

  const error = {
    msg: "Completa los campos requeridos",
    key: Math.random(),
    type: "error",
  };

  const errorEmail = {
    msg: "Email invalido",
    key: Math.random(),
    type: "error",
  };

  const errorPass = {
    msg:
      "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
    key: Math.random(),
    type: "error",
  };

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const rePass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  const handleChange = (e, v, n) => {
    if (Array.isArray(v)) {
      setUser({ ...user, [n]: v });
    } else {
      const { value } = e.target;
      setUser({ ...user, [e.target.name]: value });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const validate = () => {
    if (user.password.length === 0 && step === 2) setSnackBar(error);
    else if (!rePass.test(user.password)) setSnackBar(errorPass);
    else if (user.firstName === "" && step === 2) setSnackBar(error);
    else if (user.lastName === "" && step === 2) setSnackBar(error);
    else if (user.country === "" && step === 2) setSnackBar(error);
    else if (user.email === "" && step === 2) setSnackBar(error);
    else if (!re.test(user.email)) setSnackBar(errorEmail);
    else {
      setStep(step + 1);
      setSnackBar("");
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitMySkills = (skillsArray) => setSkills(skillsArray);
  const handleSubmit = () => register(user).then(nextStep());

  useEffect(() => dispatch(getSkillsList()), [dispatch]);
  // useEffect(() => console.log(skills), [skills])
  switch (step) {
    case 1:
      return (
        <FormUserNew
          nextStep={nextStep}
          handleChange={handleChange}
          steps={steps}
        />
      );
    case 2:
      return (
        <FormUserData
          selectedStep={step}
          nextStep={validate}
          prevStep={prevStep}
          handleChange={handleChange}
          user={user}
          steps={steps}
          snackBar={snackBar}
        />
      );
    case 3:
      return (
        <FormUserSkills
          submitMySkills={submitMySkills}
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          skillsList={skillsList}
          user={user}
          steps={steps}
        />
      );
    case 4:
      return (
        <FormUserSave
          handleSubmit={handleSubmit}
          submitMySkills={submitMySkills}
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          skillsList={skillsList}
          user={user}
          steps={steps}
        />
      );

    case 5:
      return (
        <FormUserSuccess
          submitMySkills={submitMySkills}
          selectedStep={step}
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          skillsList={skillsList}
          user={user}
          steps={steps}
        />
      );
    default:
  }
}

export default UserForm;
