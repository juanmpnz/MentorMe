import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import { menteesCard } from "../Mentees/materialStyles";

export default function MyMentors({ mentors }) {
  const classes = menteesCard();
  return (
    <div className="conteiner-card">
      <h3>MIS MENTORES</h3>
      <List className={classes.root}>
        {mentors.length ? (
          mentors.map((mentor) => {
            return (
              <Link
                to={`/mymentors/${mentor._id}`}
                style={{ textDecoration: "none" }}
              >
                <ListItem
                  alignItems="flex-start"
                  className="myMentorsCards_ListItem"
                  key={mentor._id}
                >
                  <ListItemAvatar>
                    {console.log("mentor", mentor)}
                    <Link to={`/profile/${mentor._id}`}>
                      <Avatar
                        alt={`${mentor.firstName} ${mentor.lastName} avatar`}
                        src={mentor.avatar}
                      />
                    </Link>
                    <Link to={`/profile/${mentor._id}`}>
                      <ShareRoundedIcon style={{ color: "black" }} />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Nombre: {`${mentor.firstName} ${mentor.lastName}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <div>{`Email: ${mentor.email}`}</div>
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <div>{`Teléfono: ${mentor.phoneNumber}`}</div>
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <div>{`Te está enseñando: ${mentor.skillsToTeach
                            .map((e) => e.name)
                            .join(", ")}. `}</div>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Link>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>No tienes mentores</div>
        )}
      </List>
    </div>
  );
}
