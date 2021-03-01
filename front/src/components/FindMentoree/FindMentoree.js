import React from "react"
import Avatar from "@material-ui/core/Avatar"
import { Button, Container } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import { Link } from "react-router-dom"
import { matrixLog } from "../../utilities"
import { AvatarStyle } from "./utils/MaterialStyles"
import AlertSnackBar from "../../utilities/alertSnackbar"

matrixLog("FindMentoree")

function FindMentoree({
  option, // find/mentor o find/mentee => las opciones son "mentor" o "mentee"
  mentoreeOne,
  mentoreeTwo,
  handleClickMentoreeOne,
  handleClickMentoreeTwo,
  skillsToTeachOrLearn,
  snackBar,
  clickCardOne,
  clickCardTwo,
}) {
  const classes = AvatarStyle()
  const searchedSkills = option === "mentor" ? "skillsToTeach" : "skillsToLearn"
  return (
    <div>
      <Container maxWidth="xs">
        <p style={{ textAlign: "center" }}>
          {`Habilidades a ${option === "mentor" ? "aprender" : "enseñar"}:  `}
          <br />
          {`${skillsToTeachOrLearn}`}
          <br />
        </p>
        <div className="cardsContainer">
          <hr />
          <form onSubmit={(e) => handleClickMentoreeOne(e, option)}>
            <div className="matchCard">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Avatar className={classes.large} src={mentoreeOne.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <h4 style={{ margin: 0 }}>
                      {mentoreeOne && mentoreeOne.firstName} {mentoreeOne && mentoreeOne.lastName}
                    </h4>
                    <p style={{ margin: 0 }}>
                      <em>
                        <strong>País:</strong> {mentoreeOne && mentoreeOne.country}
                      </em>
                    </p>

                    <p style={{ margin: 0 }}>
                      <em>
                        <strong>Idiomas:</strong> {mentoreeOne.languages && mentoreeOne.languages.join(", ")}
                      </em>
                    </p>
                  </div>
                  <hr />
                  <div>
                    <h4 style={{ margin: 0 }}>{option === "mentor" ? `Quiere enseñar:` : `Quiere aprender:`}</h4>

                    {mentoreeOne[searchedSkills] &&
                      mentoreeOne[searchedSkills].map((skill, i) => {
                        return (
                          <span key={i} className="matchingSkills">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 34 15">
                              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                            </svg>
                            {`${skill.name}  `}
                          </span>
                        )
                      })}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit">{clickCardOne === 1 ? "SELECCIONAR" : "CONFIRMAR"}</Button>
                </Grid>
              </Grid>
            </div>
          </form>
          <h3>VS</h3>
          <form onSubmit={(e) => handleClickMentoreeTwo(e, option)}>
            <div className="matchCard">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Avatar className={classes.large} alt="Remy Sharp" src={mentoreeTwo.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <h4 style={{ margin: 0 }}>
                      {mentoreeTwo && mentoreeTwo.firstName} {mentoreeTwo && mentoreeTwo.lastName}
                    </h4>
                    <p style={{ margin: 0 }}>
                      <em>
                        <strong>País:</strong> {mentoreeTwo && mentoreeTwo.country}
                      </em>
                    </p>

                    <p style={{ margin: 0 }}>
                      <em>
                        <strong>Idiomas:</strong> {mentoreeTwo.languages && mentoreeTwo.languages.join(", ")}
                      </em>
                    </p>
                  </div>
                  <hr />
                  <div>
                    <h4 style={{ margin: 0 }}>{option === "mentor" ? `Quiere enseñar:` : `Quiere aprender:`}</h4>

                    {mentoreeTwo[searchedSkills] &&
                      mentoreeTwo[searchedSkills].map((skill, i) => {
                        return (
                          <span key={i} className="matchingSkills">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 34 15">
                              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                            </svg>
                            {`${skill.name}  `}
                          </span>
                        )
                      })}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit">{clickCardTwo === 1 ? "SELECCIONAR" : "CONFIRMAR"}</Button>
                </Grid>
              </Grid>
            </div>
          </form>
          <hr /> <br />
          <div className="btnPreferencias">
            <Link
              to={{ pathname: "/skills/select", state: { option, changeSearch: true } }}
              style={{ textDecoration: "none", color: "gray", fontSize: "14px" }}
            >
              <Button type="submit" variant="contained">
                Cambiar preferencias de busqueda
              </Button>
            </Link>
          </div>
        </div>

        {snackBar ? <AlertSnackBar key={snackBar.key} message={snackBar.msg} type={snackBar.type} /> : null}
      </Container>
    </div>
  )
}
export default FindMentoree
