import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SchoolIcon from "@material-ui/icons/School";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { matrixLog } from "../../../utilities";
import { logout } from "../../../redux/action-creators/currentUser";
// color="#3b3b3b" size="2x"
const searchMentees = <FontAwesomeIcon icon={faChalkboardTeacher} />;

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  ButtonBurger: {
    "& .MuiIconButton-root": {
      flex: "0 0 auto",

      padding: "12px",
      overflow: "visible",
      fontSize: "1.5rem",
      textAlign: "center",
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderRadius: "50%",
    },
    "& .MuiSvgIcon-root": {
      fill: "currentColor",
      width: "2em",
      height: "1em",
      display: "inline - block",
      fontSize: "2.5rem",
      transition: "fill 200ms cubic- bezier(0.4, 0, 0.2, 1) 0ms",
      color: "#fff",
    },
  },
});

export default function TemporaryDrawer() {
  matrixLog("BURGER");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem>
        <ListItemText secondary="MENTOR ME" />
      </ListItem>
      <Divider />

      <ListItem button component={Link} to="/myprofile">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="MI PERFIL" />
      </ListItem>

      <ListItem
        button
        component={Link}
        to={{
          pathname: "/skills/select",
          state: { option: "mentor", changeSearch: false },
        }}
      >
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="BUSCAR MENTOR" />
      </ListItem>

      <ListItem
        button
        component={Link}
        to={{
          pathname: "/skills/select",
          state: { option: "mentee", changeSearch: false },
        }}
      >
        <ListItemIcon>{searchMentees}</ListItemIcon>
        <ListItemText primary="BUSCAR MENTEES" />
      </ListItem>

      <List>
        <ListItem button component={Link} to="/login">
          <ListItemIcon onClick={() => dispatch(logout())}>
            CERRAR SESION
          </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            className={classes.ButtonBurger}
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <div className="burgerDesktop2">
              <MenuIcon />
            </div>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
