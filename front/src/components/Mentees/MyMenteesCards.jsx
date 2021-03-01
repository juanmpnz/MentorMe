import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import { menteesCard } from "./materialStyles";

export default function MyMenteesCards({ mentees }) {
  const currentUser = useSelector((state) => state.currentUser);
  const classes = menteesCard();
  return (
    <div>
      {" "}
      {mentees.length ? (
        <div className="conteiner-card">
          <h3>Mis mentees</h3>
          <List className={classes.root}>
            {mentees.length
              ? mentees.map((mentee) => {
                  console.log(mentee);
                  return (
                    <Link to={`/mymentees/${mentee._id}`} style={{ textDecoration: "none" }} key={mentee._id}>
                      <ListItem alignItems="flex-start" key={mentee._id}>
                        <ListItemAvatar>
                          <Link to={`/profile/${mentee._id}`}>
                            <Avatar alt="Remy Sharp" src={mentee.avatar} />
                          </Link>
                          <Link to={`/profile/${mentee._id}`}>
                            <ShareRoundedIcon style={{ color: "black" }} />
                          </Link>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography className={classes.inline} color="textPrimary">
                              Nombre : {mentee.firstName} {mentee.lastName}{" "}
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
                                Skills a enseñar :
                              </Typography>
                              <br />
                              <br />
                              {currentUser.skillsToTeach.map((e) => (
                                <li>{e.name}</li>
                              ))}
                            </>
                          }
                        />
                      </ListItem>
                    </Link>
                  );
                })
              : null}
          </List>
        </div>
      ) : (
        <div className="content">No tienes ningún mentee</div>
      )}
    </div>
  );
}
