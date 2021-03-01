import React from "react";
import { TextField, Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { formUserDataStyles } from "../../Register/components/materialStyles";
import AlertSnackBar from "../../../utilities/alertSnackbar";

export default function EditProfile({
  user,
  handleChange,
  handleSubmit,
  firstName,
  lastName,
  phoneNumber,
  snackBar,
}) {
  const classes = formUserDataStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div className="editProfile">
        <h3 style={{ textAlign: "center" }}>Edita tu perfil</h3>

        <form onSubmit={handleSubmit} className="dashProfile2ContainerEdit">
          <Container>
            {snackBar ? (
              <AlertSnackBar
                key={snackBar.key}
                message={snackBar.msg}
                type={snackBar.type}
              />
            ) : null}

            <Grid item xs={12}>
              <TextField
                placeholder={user.firstName}
                onChange={handleChange}
                className={classes.formLogininput}
                id="outlined-search"
                label=" Nombre *"
                name="firstName"
                type="text"
                variant="outlined"
                value={firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder={user.lastName}
                className={classes.formLogininput}
                onChange={handleChange}
                id="outlined-search"
                label=" Apellido *"
                name="lastName"
                type="text"
                variant="outlined"
                value={lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.formLogininput}
                id="outlined-search"
                label="Telefono *"
                name="phoneNumber"
                type="number"
                variant="outlined"
                onChange={handleChange}
                value={phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="buttonEditProfile">
                <Button
                  style={{
                    color: "#fff",
                    border: "2px solid rgba(18,41,68,1)",
                    marginBottom: "1.5rem",
                    marginTop: "1rem",
                    textDecoration: "none",
                    borderRadius: "20px",
                    background: "rgba(18,41,68,1)",
                  }}
                  className="buttoncreateacc"
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  editar{" "}
                </Button>
              </div>
              {snackBar ? (
                <AlertSnackBar
                  key={snackBar.key}
                  message={snackBar.msg}
                  type={snackBar.type}
                />
              ) : null}
            </Grid>
          </Container>
        </form>
      </div>
    </Grid>
  );
}
