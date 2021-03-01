import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Progresscheck from "../checkbox/Progresscheck"
import CheckboxList from "../checkbox/CheckboxList"
import { formUserDataStyles } from "../Mentees/materialStyles"

export default function MyMentor({ selectedMentor, objectives, handleSelect }) {
  const useStyles = makeStyles(() => ({
    Accordion: {
      "& .MuiAccordionDetails-root": {
        padding: "8px 6px 14px",
        display: "block",

      },
    },
  }))

  const classes = formUserDataStyles()
  const classes2 = useStyles()
  const [, setExpanded] = React.useState(false)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className="conteiner-card">
      <Accordion className={classes2.Accordion} style={{ width: "100%"  }}>
        <AccordionSummary style={{boxShadow: "0px 2px 17px 4px rgba(0, 0, 0, 0.2)"}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <div>VER TUS OBJETIVOS</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion className={classes.Accordion} onChange={handleChange(`${selectedMentor._id}`)}>
            <Grid>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography className={classes.Heading}>
                  {`Habilidades: `}
                  {selectedMentor.teachingSkills ? selectedMentor.teachingSkills.map((e) => e.name).join(", ") : null}
                </Typography>
              </AccordionSummary>
            </Grid>
            <Grid item xs={12}>
              <AccordionDetails>
                <CheckboxList objectives={objectives} handleSelect={handleSelect} />
                {selectedMentor && selectedMentor.objectives && selectedMentor.objectives.length ? (
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
        <AccordionSummary  style={{boxShadow: "0px 2px 17px 4px rgba(0, 0, 0, 0.2)"}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>
            <div>VER TUS MEETINGS</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {selectedMentor && selectedMentor.meetings.length ? 
          <Accordion className={classes.Accordion} onChange={handleChange(`${selectedMentor._id}`)}>
            <Grid>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography className="mymentor-meetings-title">Meetings:</Typography>
              </AccordionSummary>
            </Grid>
            <Grid xs={12}>
              {selectedMentor.meetings.map((meeting) => {
                  return (
                    <AccordionDetails>
                      <ul style={{ listStyle: "none" }}>
                        <li style={{ textAlign: "center" }}>Link: {meeting.link}</li>
                        <li style={{ textAlign: "center" }}>Fecha: {meeting.date}</li>
                        <li style={{ textAlign: "center" }}>Description: {meeting.text}</li>
                      </ul>
                    </AccordionDetails>
                  )})}
            </Grid>
          </Accordion>
           :
           (
             <div className="myMentor-nomeeting">No tienes Meetings agendadas</div>
           )
           }
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
