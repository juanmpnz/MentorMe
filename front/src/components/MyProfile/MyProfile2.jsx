import React from "react";
import Container from "@material-ui/core/Container";

// Components
import PublicIcon from "@material-ui/icons/Public";
import MailIcon from "@material-ui/icons/Mail";
import { useParams } from "react-router-dom";
import Tab from "./utils/Tab";
import MyInfo from "./utils/MyInfo";
// import EditProfile from "./utils/EditProfile"
import Progress from "../Progress/Progress";
import EditProfileContainer from "./EditProfileContainer";

function myProfile({ user, handleBool, skill, progress, edit, handleSkill, handleProgress, handleEdit }) {
  // const { id } = useParams()

  return (
    <div className="myProfileContainer2">
      <div className="myProfileTop">
        <div className="myProfileBackground">
          <div className="bg1" />
          <div className="bg2"> </div>
        </div>
        <div className="viewProfile">
          <div className="avatarAndName">
            <div>
              <img srcSet="https://elysium.tf/data/avatars/l/0/357.jpg?1575296289" alt="" />
            </div>
            <div className="infoName">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="infoo">
                <span>
                  <MailIcon style={{ marginRight: "2px", color: "rgba(0,0,0,0.54)" }} />
                  {user.email}{" "}
                </span>
                <span>
                  <PublicIcon style={{ marginRight: "2px", color: "rgba(0,0,0,0.54)" }} />
                  {user.country}
                </span>
              </div>
            </div>
          </div>
          <Tab handleSkill={handleSkill} handleProgress={handleProgress} handleEdit={handleEdit} />
        </div>
      </div>
      <div className="myProfileBottom">
        <br />

        <div className="componentesBottomScroll">
          {/* <MyInfo user={user} /> */}
          {progress ? <Progress /> : null}
          {skill ? <MyInfo user={user} /> : null}
          {edit ? <EditProfileContainer user={user} /> : null}
        </div>
      </div>
    </div>
  );
}
export default myProfile;
