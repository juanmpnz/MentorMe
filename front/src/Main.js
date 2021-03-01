/* eslint-disable no-shadow */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from "react-transition-group"
// import Container from "@material-ui/core/Container"
import { matrixLog, getCookie } from "./utilities";
import { getNotifications } from "./redux/action-creators/notifications";
// STYLES
import "./assets/index.scss";
// COMPONENTS
import Landing from "./components/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
import UserForm from "./components/Register/UserForm";
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import MyProfileContainer from "./components/MyProfile/MyProfileContainer";
import AvatarUploadContainer from "./components/MyProfile/AvatarUpload";
import SelectSkillsContainer from "./containers/FilterMentoreeSearchContainer";
import FindMentoreeContainer from "./containers/FindMentoreeContainer";
import MenteesList from "./containers/MenteesList";
import MenteeIndividual from "./containers/MenteeIndividual";
import NotificationsContainer from "./containers/NotificationsContainer";
// import MyMentorsView from "./components/MyMentors/MyMentorsView"
import MyMentorContainer from "./containers/MyMentorContainer";
import MyMentorsContainer from "./containers/MyMentorsContainer";
import NotFoundPage from "./components/404/404";
import ShareProfileContainer from "./containers/ShareProfileContainer";

// ACTIONS
import { me } from "./redux/action-creators/currentUser";

function Main({ history, location }) {
  matrixLog("MAIN");
  const dispatch = useDispatch();
  const path = location.pathname;
  const notificationsCount = useSelector((state) => state.notifications.length);

  // HOOK PERSISTENCIA DE SESION
  React.useEffect(() => {
    // persistencia
    const token = getCookie("token");
    if (token !== null) {
      dispatch(me(token)).then(() => {
        if (path === "/") setTimeout(() => history.push("/myprofile"), 1500);
        dispatch(getNotifications());
      });
    } else if (path === "/") setTimeout(() => history.push("/login"), 1500);
    else history.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {path === "/" ? null : <Navbar />}

      <Route
        render={() => (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={UserForm} />
            <Route path="/myprofile" component={MyProfileContainer} />
            <Route path="/mymentees/:id" component={MenteeIndividual} />
            <Route exact path="/mymentees" component={MenteesList} />

            <Route path="/mymentors/:id" component={MyMentorContainer} />
            <Route path="/progress" component={MyMentorsContainer} />

            <Route path="/skills/select" component={SelectSkillsContainer} />
            <Route path="/find/mentee" component={FindMentoreeContainer} />
            <Route path="/find/mentor" component={FindMentoreeContainer} />
            <Route path="/avatar" component={AvatarUploadContainer} />
            <Route path="/notifications" component={NotificationsContainer} />
            <Route exact path="/" component={Landing} />
            <Route path="/profile/:id" component={ShareProfileContainer} />
            <Route path="/*" component={NotFoundPage} />
          </Switch>
        )}
      />

      {path === "/" || path === "/register" || path === "/login" ? null : (
        <Menu notificationsCount={notificationsCount} />
      )}
    </>
  );
}

export default Main;
// {ShareProfileContainer}
// {MyProfileContainer}

// import ShareProfileContainer from "./containers/ShareProfileContainer";
// <Route path="/profile/:id" component={ShareProfileContainer} />
