import React from "react"
import { useLocation, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid"

import { matrixLog } from "../../utilities"
import Burger from "./Components/Burger"

import Despegable from './Components/utils/Despegable'

export default function Navbar() {
  matrixLog("NAVBAR")
  const path = useLocation().pathname
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser)
  return (
    <Grid container className="container" style={{ alignItems: "center" }}>
      <Grid item className="burgerDesktop">
        <div className="burger">{path === "/login" || path === "/register" ? null : <Burger />}</div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className="logo2">
          mentor<span>me</span>
        </div>
      </Grid>

      {currentUser._id ? <Grid item xs={12} sm={6}>
        <div className="menuDesktop">
          <ul>
            <Link className="linkDesktop" to="/progress">
              <li>Mentors</li>
            </Link>

            <Link className="linkDesktop" to="/mymentees">
              <li>Mentees</li>
            </Link>

            <Link className="linkDesktop" to="/notifications">
              <li>Notifications</li>
            </Link>
          </ul>
          <Link className="linkDesktop">
            <Despegable className='despegable' />
          </Link>
        </div>
      </Grid> : null}



      <Grid item xs={12} sm={6}>
        <div className="logo">
          mentor<span>me</span>
        </div>
      </Grid>
    </Grid>
  )
}
