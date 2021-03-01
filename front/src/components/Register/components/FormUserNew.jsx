import React from "react";
import { Button } from "@material-ui/core";
import { formUserNewStyles } from "./materialStyles";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";

function FormUserNew({ nextStep }) {
  const classes = formUserNewStyles();
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Grid item xs={10} sm={12}>
        <div className="flex">
          <h3>Bienvenido, vemos que eres nuevo por aqui!</h3>
        </div>
      </Grid>
      <Grid item xs={10} sm={12}>
        <div className="flex">
          <p>
            Comencemos por completar informacion sobre tu perfil para poder
            ayudarte a encontrar tu match perfecto.
          </p>
        </div>
      </Grid>
      <Grid item xs={10} sm={12}>
        <Button
          style={{
            backgroundColor: "rgba(18,41,68,1)",
            borderRadius: "20px",
          }}
          variant="contained"
          color="primary"
          onClick={nextStep}
        >
          comenzar
        </Button>
      </Grid>
      <Grid item xs={10} sm={12}>
        <br />
        <em style={{ textDecoration: "none", color: "gray" }}>
          ya tenes tu cuenta?{" "}
          accede {" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "rgba(18,41,68,1)", fontWeight: "bold" }}
            className="forgotpassword"
          >
            aquí{" "}
          </Link>
        </em>
      </Grid>
    </Grid >
  );
}
export default FormUserNew;
