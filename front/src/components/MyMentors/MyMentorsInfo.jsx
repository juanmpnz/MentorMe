import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Progresscheck from "../checkbox/Progresscheck";
import CheckboxList from "../checkbox/CheckboxList";
import { formUserDataStyles } from "../Mentees/materialStyles";

export default function MyMentorsInfo() {
  const useStyles = makeStyles((theme) => ({
    Accordion: {
      "& .MuiAccordionDetails-root": {
        padding: "8px 6px 14px",
        display: "block",
      },
    },
  }));
  const classes = formUserDataStyles();
  const classes2 = useStyles();
  const [, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mentors = useSelector((state) => state.currentUser.mentors);
  const { id } = useParams();
  let mentorSelected = {};
  for (let i = 0; i < mentors.length; i++) {
    if (mentors && mentors[i]._id === id) mentorSelected = mentors[i];
  }

  const userId = useSelector((state) => state.currentUser._id);
  const [objectives, setObjectives] = useState([]);

  React.useEffect(() => {
    axios.get(`/api/users/${userId}/mentors/${id}/objectives/`).then((data) => {
      setObjectives(data.data);
    });
  }, [userId, id]);

  async function handleSelect(objectiveId) {
    await axios.patch(`/api/users/${userId}/mentors/${id}/objectives/${objectiveId}/changeStatus`).then(() => {
      axios.get(`/api/users/${userId}/mentors/${id}/objectives/`).then((data) => {
        setObjectives(data.data);
      });
    });
  }

  return (
    <div className="conteiner-card">
      <Accordion className={classes2.Accordion} style={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <div>VER TUS OBJETIVOS</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion className={classes.Accordion} onChange={handleChange(`${mentorSelected._id}`)}>
            <Grid>
              <AccordionSummary
                style={{ boxShadow: "0px 2px 17px 4px rgba(0, 0, 0, 0.2)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.Heading}>
                  Skill:{" "}
                  {mentorSelected.teachingSkills ? mentorSelected.teachingSkills.map((e) => e.name).join(", ") : null}
                </Typography>
              </AccordionSummary>
            </Grid>
            <Grid xs={12}>
              <AccordionDetails>
                <CheckboxList objectives={objectives} handleSelect={handleSelect} />
                {mentorSelected && mentorSelected.objectives && mentorSelected.objectives.length ? (
                  <Progresscheck className="progressCheck" objectives={objectives} />
                ) : (
                  "No tienes objetivos todavia"
                )}
              </AccordionDetails>
            </Grid>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes2.Accordion} style={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <div>VER TUS MEETINGS</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion className={classes.Accordion} onChange={handleChange(`${mentorSelected._id}`)}>
            <Grid>
              <AccordionSummary
                style={{ boxShadow: "0px 2px 17px 4px rgba(0, 0, 0, 0.2)" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.Heading}>Meetings:</Typography>
              </AccordionSummary>
            </Grid>
            <Grid xs={12}>
              {mentorSelected.meetings &&
                mentorSelected.meetings.map((meeting) => {
                  return (
                    <AccordionDetails>
                      <ul style={{ listStyle: "none" }}>
                        <li style={{ textAlign: "center" }}>Link: {meeting.link}</li>
                        <li style={{ textAlign: "center" }}>Fecha: {meeting.date}</li>
                        <li style={{ textAlign: "center" }}>Description: {meeting.text}</li>
                      </ul>
                    </AccordionDetails>
                  );
                })}
            </Grid>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
