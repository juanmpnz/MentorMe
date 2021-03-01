import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function MyInfo({ user }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        {/* ACORDEON DE DATOS PERSONALES */}
        <Accordion style={{ marginTop: "55px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Mi información</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <Typography>{`Nombre: ${user.firstName} ${user.lastName}`}</Typography>
              </ListItem>
              {user.country ? (
                <ListItem>
                  <Typography> País: {user.country} </Typography>
                </ListItem>
              ) : null}
              {user.phoneNumber ? (
                <ListItem>
                  <Typography> Teléfono: {user.phoneNumber} </Typography>
                </ListItem>
              ) : null}
              {user.languages.length ? (
                <ListItem>
                  <Typography> Lenguajes: {user.languages} </Typography>
                </ListItem>
              ) : null}

              {user.skills.length ? (
                <ListItem>
                  <Typography> Habilidades que conozco: {user.skills.map((e) => e.name).join(", ")}. </Typography>
                </ListItem>
              ) : null}

              {user.skillsToLearn.length ? (
                <ListItem>
                  <Typography>
                    Habilidades que quiero aprender: {user.skillsToLearn.map((e) => e.name).join(", ")}.
                  </Typography>
                </ListItem>
              ) : null}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* ACORDEON DE MENTORES */}
        {user.mentors.length ? (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography className={classes.heading}>Mentores</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {user.mentors.map((e) => {
                  return (
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary
                          style={{ marginBottom: "5px" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>{`${e.firstName} ${e.lastName}`}</Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{ padding: 0 }}>
                          <List>
                            <ListItem>
                              <Typography>{e.country ? `Pais: ${e.country}` : null}</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>{e.phoneNumber ? `Teléfono: ${e.phoneNumber}` : null}</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>Lenguajes: {e.languages}</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>
                                Me está enseñando:
                                {`${e.teachingSkills.map((el) => el.name).join(", ")}.`}
                              </Typography>
                            </ListItem>
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Accordion disabled>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
              <Typography className={classes.heading}>Mentores</Typography>
            </AccordionSummary>
          </Accordion>
        )}

        {/* ACORDEON DE MENTEES */}
        {user.mentees.length ? (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography className={classes.heading}>Mentees</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                {user.mentees.map((e) => {
                  console.log(e);
                  return (
                    <Grid item xs={12}>
                      <Accordion style={{ width: "100%" }} key={e._id}>
                        <AccordionSummary
                          style={{ marginBottom: "5px" }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography className={classes.heading}>{`${e.firstName} ${e.lastName}`}</Typography>
                        </AccordionSummary>

                        <AccordionDetails style={{ padding: 0 }}>
                          <List>
                            <ListItem>
                              <Typography>Pais: {e.country}</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>Teléfono: {e.phoneNumber}</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>Lenguajes: {e.languages}</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>
                                Enseñando:
                                {`  ${e.teachingSkills.map((el) => el.name).join(", ")}.`}
                              </Typography>
                            </ListItem>
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Accordion disabled>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
              <Typography className={classes.heading}>Mentees</Typography>
            </AccordionSummary>
          </Accordion>
        )}
      </Container>
    </div>
  );
}
