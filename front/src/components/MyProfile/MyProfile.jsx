import React from "react";

// Components
import PublicIcon from "@material-ui/icons/Public";
import MailIcon from "@material-ui/icons/Mail";
import EditIcon from '@material-ui/icons/Edit';
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Tab from "./utils/Tab";
import MyInfo from "./utils/MyInfo";
import EditProfileContainer from "./EditProfileContainer";

function myProfile({ user, skill, edit, handleEdit, handleSkill }) {
  return (
    <div className="myProfileContainer2 conteiner">
      <div className="myProfileTop">
        <div className="myProfileBackground">
          <div className="bg1" />
          <div className="bg2"> </div>
        </div>
        <div className="viewProfile">
          <div className="avatarAndName">
            <div>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div className="plusAvatar">
                    <Link to="/avatar" className="linkAvatar">
                      <EditIcon />
                    </Link>
                  </div>
                }
              >
                <Avatar
                  alt="avatar"
                  style={{ width: "16vh", height: "16vh" }}
                  src={user.avatar}
                />
              </Badge>
            </div>
            <div className="infoName">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="infoo">
                <span>
                  <MailIcon
                    style={{ marginRight: "2px", color: "rgba(0,0,0,0.54)" }}
                  />
                  {user.email}{" "}
                </span>
                <span>
                  <PublicIcon
                    style={{ marginRight: "2px", color: "rgba(0,0,0,0.54)" }}
                  />
                  {user.country}
                </span>
              </div>
            </div>
          </div>
          <Tab handleSkill={handleSkill} handleEdit={handleEdit} />
        </div>
      </div>
      <div className="myProfileBottom">
        <br />

        <div>
          {skill ? <MyInfo user={user} /> : null}
          {edit ? <EditProfileContainer user={user} /> : null}
        </div>
      </div>
    </div>
  );
}
export default myProfile;
