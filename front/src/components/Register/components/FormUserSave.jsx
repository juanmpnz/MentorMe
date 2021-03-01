import React from "react";
import { useTheme, withStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { formUserSaveStyles } from "./materialStyles";
import Grid from "@material-ui/core/Grid";
function FormUserNew({ prevStep, selectedStep, steps, user, handleSubmit }) {
  const classes = formUserSaveStyles();
  const theme = useTheme();
  const StyledTableCell = withStyles(() => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      margin: 0,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(() => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("NOMBRE:", user.firstName),
    createData("APELLIDO:", user.lastName),
    createData("EMAIL:", user.email),
    createData("TELEFONO:", user.phoneNumber),
    createData("PAIS:", user.country),
  ];

  let title;
  if (selectedStep === 4) {
    title = "Confirma tus datos";
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <h3>{title}</h3>
      <form>
        <Grid item xs={12} sm={12}>
          <div>
            <TableContainer component={Paper}>
              <Table
                className={StyledTableCell.table}
                aria-label="customized table"
              >
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.calories}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
        <br />
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
                  onClick={handleSubmit}
                  disabled={selectedStep === 0}
                >
                  confirmar
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
export default FormUserNew;
