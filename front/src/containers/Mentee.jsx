import React from "react";
import { useTheme, withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formUserDataStyles } from "../components/Mentees/materialStyles";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles((theme) => ({
  Accordion: {
    "& .MuiAccordionDetails-root": {
      padding: "8px 6px 14px",
      display: "block",
    },
  },
}));

const rows = [
  createData("NOMBREC:", "nombre"),
  createData("APELLIDOC:", "apellido"),
  createData("EMAILC:", "email@email.com "),
  createData("TELEFONO:", "3242342"),
  createData("PAIS:", "argentina"),
];

export default function Mentee() {
  const classes = formUserDataStyles();
  const classes2 = useStyles();
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
  return (
    <div className="conteiner-card">
      <Accordion className={classes2.Accordion} style={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>DATOS PERSONALES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <TableContainer
              className={classes.acordionCenter}
              component={Paper}
            >
              <Table aria-label="customized table">
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
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes2.Accordion} style={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>INGRESA UN OBJETIVO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <form>
              <TextField
                onChange="handleChange"
                className={classes.formLogininput}
                id="outlined-search"
                label=" Objetivo *"
                name="firstName"
                type="text"
                variant="outlined"
              />
              <Button
                style={{
                  backgroundColor: "rgba(18,41,68,1)",
                  borderRadius: "20px",

                  margin: "20px auto",
                }}
                className={classes.buttonSignin}
                variant="contained"
                color="primary"
              >
                agregar
              </Button>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes2.Accordion} style={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>PLANIFICA UNA REUNION</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <form>
              <TextField
                onChange="handleChange"
                className={classes.formLogininput}
                id="outlined-search"
                label=" Motivo *"
                name="text"
                type="text"
                variant="outlined"
              />
              <TextField
                onChange="handleChange"
                className={classes.formLogininput}
                id="outlined-search"
                label=" Link *"
                name="link"
                type="text"
                variant="outlined"
              />
              <br />
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.formLogininput}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                style={{
                  backgroundColor: "rgba(18,41,68,1)",
                  borderRadius: "20px",
                  width: "80%",
                  margin: "20px auto",
                }}
                className={classes.buttonSignin}
                variant="contained"
                color="primary"
              >
                agregar
              </Button>
            </form>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
