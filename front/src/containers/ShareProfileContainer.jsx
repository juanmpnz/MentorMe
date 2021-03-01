import React, { useState } from "react";
// import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import Axios from "axios";
import ShareProfile from "../components/ShareProfile/ShareProfile";

function ShareProfileContainer() {
  // const currentUser = useSelector((state) => state.currentUser)
  // const myMentees = currentUser.mentees
  const [userInfo, setUserInfo] = useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    if (!userInfo.length) {
      Axios.get(`/api/users/${id}`).then((res) => {
        setUserInfo(res.data);
      });
    }
  }, []);

  return <ShareProfile mentee={userInfo} />;
}

export default ShareProfileContainer;
