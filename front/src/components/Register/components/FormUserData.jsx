import React from "react"
import { useTheme } from "@material-ui/core/styles"
import { TextField, Button, Select, MenuItem, InputLabel, Grid } from "@material-ui/core"
import MobileStepper from "@material-ui/core/MobileStepper"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import { formUserDataStyles } from "./materialStyles"
import AlertSnackBar from "../../../utilities/alertSnackbar"

function FormUserData({ nextStep, prevStep, user, handleChange, selectedStep, steps, snackBar }) {
  const [open, setOpen] = React.useState(false)
  const classes = formUserDataStyles()
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <h3>Ingresa tus datos personales</h3>
      <form>
        <Grid item xs={6} sm={3}>
          <div>
            <TextField
              value={user.firstName}
              onChange={handleChange}
              className={classes.formLogininput}
              id="outlined-search"
              label=" Nombre"
              name="firstName"
              type="text"
              variant="outlined"
              required
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div>
            {" "}
            <TextField
              value={user.lastName}
              className={classes.formLogininput}
              onChange={handleChange}
              id="outlined-search"
              label=" Apellido"
              name="lastName"
              type="text"
              variant="outlined"
              required
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div>
            <TextField
              className={classes.formLogininput}
              value={user.email}
              id="outlined-search"
              label=" Email"
              name="email"
              type="email"
              variant="outlined"
              onChange={handleChange}
              required
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div>
            <TextField
              className={classes.formLogininput}
              value={user.password}
              id="outlined-search"
              label=" Contraseña"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              required
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div>
            <TextField
              className={classes.formLogininput}
              value={user.phoneNumber}
              id="outlined-search"
              label="Telefono"
              name="phoneNumber"
              type="number"
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div>
            <InputLabel id="demo-simple-select-outlined-label" style={{ marginTop: "18px" }}>
              Pais
            </InputLabel>

            <Select
              value={user.country}
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              className={classes.formLogininput}
              open={open}
              onClose={handleClose}
              name="country"
              onOpen={handleOpen} // para hacerlo controlled deberiamos hacer un hook here
              onChange={handleChange}
              autoWidth
              required
            >
              <MenuItem value="">
                <em>Selecciona tu pais</em>
              </MenuItem>
              <MenuItem value="Argentina">Argentina</MenuItem>
              <MenuItem value="Bolivia">Bolivia</MenuItem>
              <MenuItem value="Brasil">Brasil</MenuItem>
              <MenuItem value="Chile">Chile</MenuItem>
              <MenuItem value="Colombia">Colombia</MenuItem>
              <MenuItem value="Ecuador">Ecuador</MenuItem>
              <MenuItem value="Paraguay">Paraguay</MenuItem>
              <MenuItem value="Peru">Peru</MenuItem>
              <MenuItem value="Uruguay">Uruguay</MenuItem>
              <MenuItem value="Venezuela">Venezuela</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <MobileStepper
              variant="dots"
              steps={steps}
              position="static"
              activeStep={selectedStep - 2}
              className={classes.root}
              nextButton={
                <Button size="small" onClick={nextStep} disabled={selectedStep === steps}>
                  Siguiente
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft style={{ color: "#fff" }} />
                  ) : (
                    <KeyboardArrowRight style={{ color: "#fff" }} />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={prevStep} disabled={selectedStep === 0}>
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight style={{ color: "#fff" }} />
                  ) : (
                    <KeyboardArrowLeft style={{ color: "#fff" }} />
                  )}
                  Atras
                </Button>
              }
            />
          </div>
        </Grid>
      </form>
      {snackBar ? <AlertSnackBar key={snackBar.key} message={snackBar.msg} type={snackBar.type} /> : null}
    </Grid>
  )
}

export default FormUserData
