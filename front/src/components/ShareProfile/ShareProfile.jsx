import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    allingItems: "center",
    "& .MuiAvatar-img": {
      width: "60px",
      // height: "80px",
      borderRadius: "50%",
    },
  },
  media: {
    height: 140,
  },
});

// Accordion: {
//   "& .MuiAccordionDetails-root": {
//     padding: "8px 6px 14px",
//     display: "block",
//   },
// },

export default function ShareProfile(mentee) {
  const currentUser = useSelector((state) => state.currentUser);
  const menteee = mentee.mentee;
  const classes = useStyles();
  const { id } = useParams();

  return (
    <div className="conteiner-card">
      <Card className={classes.root}>
        <CardActionArea>
          <Avatar style={{ width: "100%" }} alt="Remy Sharp" src={menteee.avatar} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {menteee.firstName} {menteee.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {menteee.email}
              <br />
              {menteee.phoneNumber}
              <br />
              {menteee.country}
              <br />

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>Skills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {menteee.skills &&
                      menteee.skills.map((skill) => {
                        return <li>{skill.name}</li>;
                      })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <a
              style={{ textDecoration: "none" }}
              href={`mailto:?subject=Mira%20este%20perfil%20%21&body=Te%20comparto%20este%20perfil%20%3A%20%0A%0A-%20http%3A//localhost%3A3000/profile/${id}%0A%0ASaludos%20%21%0A%0A${currentUser.firstName}%20${currentUser.lastName}`}
            >
              Compartir perfil
            </a>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
  // <div style={{ overflow: "scroll" }}>
  //   <div className="conteiner-card">
  //     <h3>Nombre</h3>
  //     <h2>
  //       {menteee.firstName} {menteee.lastName}
  //     </h2>
  // <Avatar
  //   alt="Remy Sharp"
  //   src="https://www.masgamers.com/wp-content/uploads/2019/10/Se%C3%B1or-de-los-Anillos-foto-2.jpg"
  // />
  //     <h3>Mail</h3>
  //     <h2>{menteee.email}</h2>
  //     <h3>Telefono (icono)</h3>
  //     <h2>{menteee.phoneNumber}</h2>
  //     <h3>Pais</h3>
  //     <h2>{menteee.country}</h2>
  //     <h3>SKILLS?</h3>
  //     {menteee.skills &&
  //       menteee.skills.map((skill) => {
  //         return <h2>{skill.name}</h2>;
  //       })}
  //   </div>
  // </div>
}
