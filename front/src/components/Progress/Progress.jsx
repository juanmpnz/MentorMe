import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import CheckboxList from "../checkbox/CheckboxList";
import Progresscheck from "../checkbox/Progresscheck";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  Accordion: {
    "& .MuiAccordionDetails-root": {
      padding: "8px 16px 0",
    },
  },
}));

const Progress = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mentors = useSelector((state) => state.currentUser.mentors);

  return (
    <div className="dashProfile2Container">
      {mentors.map((mentor) => {
        return mentor.teachingSkills.map((e) => {
          return (
            <Accordion
              key={e._id}
              expanded={expanded === `${e._id}`}
              className={classes.Accordion}
              onChange={handleChange(`${e._id}`)}
            >
              <Grid xs={12}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>{e.name}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Mentor: {`${mentor.firstName} ${mentor.lastName}`}
                  </Typography>
                </AccordionSummary>
              </Grid>
              <Grid>
                <AccordionDetails>
                  <CheckboxList objectiveList={mentor.objectives} />
                  {mentor.objectives.length ? (
                    <Progresscheck
                      className="progressCheck"
                      objectiveList={mentor.objectives}
                    />
                  ) : (
                    <div className="content">
                      No tienes nuevas notificaciones
                    </div>
                  )}
                </AccordionDetails>
              </Grid>
            </Accordion>
          );
        });
      })}
    </div>
  );
};

export default Progress;
