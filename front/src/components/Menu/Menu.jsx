import React from "react"
// Iconos
import { Badge, makeStyles, Grid } from "@material-ui/core"
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone"

import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SchoolIcon from "@material-ui/icons/School"
import { Link } from "react-router-dom"

const useStyles = makeStyles(() => ({
  badge: {
    "& .MuiBadge-colorPrimary": {
      backgroundColor: "#a6d431",
    },
  },
}))

function Menu({ notificationsCount }) {
  const classes = useStyles()
  return (
    <div id="footer" className="container-menu" style={{ flexGrow: 1 }}>
      <Grid container style={{ margin: "15px", alignItems: "center", textAlign: "center" }}>
        <Grid item xs={3} style={{ margin: "auto" }}>
          <Link to="/myprofile">
            <AccountCircleIcon fontSize="large" className="footer-icons" />
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link to="/progress">
            <svg style={{ fill: "#FFFFFF", height: "25px", width: "30px" }}>
              <path d="M1.176,7.401h7.403V0H1.176V7.401z M2.466,1.29h4.822v4.822H2.466V1.29z" />{" "}
              <path d="M1.176,15.504h7.403V8.101H1.176V15.504z M2.466,9.392h4.822v4.821H2.466V9.392z" />{" "}
              <path d="M1.176,23.573h7.403V16.17H1.176V23.573z M2.466,17.46h4.822v4.822H2.466V17.46z" />{" "}
              <path d="M1.176,31.646h7.403v-7.403H1.176V31.646z M2.466,25.533h4.822v4.822H2.466V25.533z" />{" "}
              <rect x="10.563" y="1.488" width="19.423" height="1.45" />{" "}
              <rect x="10.563" y="4.067" width="13.943" height="1.451" />{" "}
              <rect x="10.563" y="9.146" width="19.423" height="1.45" />{" "}
              <rect x="10.563" y="11.725" width="13.943" height="1.45" />{" "}
              <rect x="11.046" y="17.445" width="19.425" height="1.451" />{" "}
              <rect x="11.046" y="20.025" width="13.944" height="1.451" />{" "}
              <rect x="11.046" y="25.346" width="19.425" height="1.45" />{" "}
              <rect x="11.046" y="27.925" width="13.944" height="1.451" />
            </svg>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link to="/mymentees">
            <SchoolIcon fontSize="large" className="footer-icons" />
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Badge
            component={Link}
            to="/notifications"
            className={classes.badge}
            color="primary"
            badgeContent={notificationsCount}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <NotificationsNoneIcon fontSize="large" className="footer-icons" />
          </Badge>
        </Grid>
      </Grid>
    </div>
  )
}

export default Menu
