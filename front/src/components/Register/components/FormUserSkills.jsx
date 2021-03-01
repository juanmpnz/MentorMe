import React, { useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Grid from "@material-ui/core/Grid";
import { formUserDataStyles } from "./materialStyles";

function FormUserSkills({
  steps,
  user,
  skillsList,
  handleChange,
  selectedStep,
  nextStep,
  prevStep,
}) {
  const ref = useRef();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const classes = formUserDataStyles();
  const theme = useTheme();

  let name;
  let title;

  if (selectedStep === 3) {
    name = "skills";
    title = "Ingresa tus Skills ";
  }

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <h3>{title}</h3>
      <form>
        <Grid item xs={12} sm={12}>
          <div>
            <Autocomplete
              value={user.skills}
              ref={ref}
              multiple
              id="checkboxes-tags-demo"
              options={skillsList}
              onChange={(event, value) => {
                name = ref.current.getAttribute("name");
                handleChange(event, value, name);
              }}
              name={name}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </>
              )}
              style={{ width: "43vh" }}
              renderInput={(params) => {
                return (
                  <TextField
                    className={classes.arrerglo}
                    {...params}
                    variant="outlined"
                    label="Skills"
                  />
                );
              }}
            />
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
                <Button
                  size="small"
                  onClick={nextStep}
                  disabled={selectedStep === 0}
                >
                  Siguiente
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft style={{ color: "#fff" }} />
                  ) : (
                    <KeyboardArrowRight style={{ color: "#fff" }} />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={prevStep}
                  disabled={selectedStep === 0}
                >
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
    </Grid>
  );
}

export default FormUserSkills;
