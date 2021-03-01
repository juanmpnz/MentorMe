import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import { formUserSuccessStyles } from "./materialStyles";
import { login } from "../../../redux/action-creators/currentUser";

function FormUserSuccess({ user }) {
  const classes = formUserSuccessStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(user.email);
  console.log(user.password);
  setTimeout(function () {
    dispatch(login(user.email, user.password)).then((res) => {
      history.push("/myprofile");
    });
  }, 2000);

  return (
    <div className="content-register">
      <h3>Usuario creado correctamente</h3>
    </div>
  );
}
export default FormUserSuccess;
