import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, TextField, Button, Grid } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../redux/action-creators/currentUser";
import AlertSnackBar from "../../utilities/alertSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  formLogininput: {
    " &.MuiFormControl-root": {
      border: "0",
      margin: "7px",
      display: "inline-flex",
      padding: "0",
      position: "relative",
      "min-width": "0",
      "flex-direction": "column",
      "vertical-align": "top",
    },
    "& .MuiInputLabel-formControl": {
      left: "14px",
      lineHeight: "22px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "4%",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      margin: "10px auto",
    },
    "& .MuiInputBase-root": {
      margin: "10px",
    },
    "& .MuiInputBase-input": {
      width: "18rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#006400",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a6d431",
    },
  },
}));

function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBar, setSnackBar] = React.useState("");

  function onChange(e) {
    setSnackBar(""); // apenas comienza a escribir nuevamente, sacamos el snackbar de error
    if (e.target.name === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setEmail(""); // clereamos el input
    setPassword("");
    dispatch(login(email, password)).then((res) => {
      if (res === "err") {
        setSnackBar({
          msg: "Invalid email or password!",
          key: Math.random(),
          type: "error",
        });
      } else history.push("/myprofile");
    });
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <form onSubmit={onSubmit} className="formContainerLogin">
        <Grid item>
          <p>Sign In</p>
        </Grid>
        <Grid item>
          <TextField
            onChange={onChange}
            className={classes.formLogininput}
            id="outlined-search"
            label=" Email"
            name="email"
            type="text"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.formLogininput}
            onChange={onChange}
            id="outlined-password-input"
            label=" Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            required
          />
        </Grid>
        <Link to="/algo" className="forgotpassword" href="http:/algo">
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="buttonLoginContainer">
          <Button
            style={{
              backgroundColor: "rgba(18,41,68,1)",
              borderRadius: "20px",
              width: "100%",
              margin: "20px auto",
            }}
            className={classes.buttonSignin}
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {" "}
            Acceder{" "}
          </Button>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              style={{
                color: "rgba(18,41,68,1)",
                border: "2px solid rgba(18,41,68,1)",
              }}
              className="buttoncreateacc"
              variant="outlined"
              color="primary"
            >
              {" "}
              Crear una cuenta{" "}
            </Button>
          </Link>
        </div>
      </form>
      {snackBar ? (
        <AlertSnackBar
          key={snackBar.key}
          message={snackBar.msg}
          type={snackBar.type}
        />
      ) : null}
    </Grid>
  );
}

export default Login;
