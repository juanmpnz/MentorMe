import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Table from "../components/Table/Table";
import { dateFormatter } from "../utilities";
import { getNotifications } from "../redux/action-creators/notifications";

function NotificationsContainer() {

  const userId = useSelector((state) => state.currentUser._id);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const notificationsRows = [];






  React.useEffect(() => {
    console.log("GET NOTIFICATIONS");
    dispatch(getNotifications());
  }, [dispatch]);

  const postMentoree = (e, cell) => {
    const notificationId = cell[1];
    const mentoreeId = cell[2];
    const option = cell[3];
    const teachingSkills = cell[4];
    axios
      .post(`/api/users/${userId}/${option}/${mentoreeId}`, {
        teachingSkills,
        notificationId,
      })
      .then(({ data }) => {
        dispatch(getNotifications());
        console.log(data);
      })
      .catch((err) =>
        console.log("el usuario ya tiene una relación contigo", err)
      );
  };

  const dismissNotification = (e, cell) => {
    const notificationId = cell[1];
    // router.patch("/:userId/notifications/:nostatus", patchNotificationStatus)
    axios
      .patch(`/api/users/${userId}/notifications/${notificationId}/status`)
      .then(({ data }) => {
        dispatch(getNotifications());
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  if (notifications.length) {

    let notificationsRows = []
    console.log("NOTIFICATIONS: ", notifications)

    notifications.forEach((e) => {
      const date = dateFormatter(e.timestamp);
      // eslint-disable-next-line prettier/prettier
      function skillsFormatter(str) {
        return str
          .map((el) => el.name)
          .join(", ")
          .replace(/,(?!.*,)/gim, " y");
      }
      switch (e.type) {
        case "mentor request":
          console.log("CASE mentor request");
          notificationsRows.push([
            date,
            `${e.mentorName} quiere enseñarte ${skillsFormatter(
              e.payload
            )}, ¿deseas aceptarlo como tu mentor?`,
            [true, e._id, e.mentorId, "mentors", e.payload],
          ]);
          break;

        case "mentor request accepted":
          console.log("CASE mentor request accepted");
          notificationsRows.push([
            date,
            `${e.menteeName
            } ha aceptado tu solicitud de enseñarle ${skillsFormatter(
              e.payload
            )}. ¡Es ahora tu mentee!`,
            [false, e._id],
          ]);
          break;

        case "mentor request rejected":
          console.log("CASE mentor request rejected");
          notificationsRows.push([
            date,
            `${e.menteeName
            } ha denegado tu solicitud de enseñarle ${skillsFormatter(
              e.payload
            )}.`,
            [false, e._id],
          ]);
          break;

        case "mentee request":
          console.log("CASE mentee request");
          notificationsRows.push([
            date,
            `${e.menteeName} quiere que le enseñes ${skillsFormatter(
              e.payload
            )}. ¿Deseas aceptarlo como tu mentee?`,
            [true, e._id, e.menteeId, "mentees", e.payload],
          ]);
          break;

        case "mentee request accepted":
          console.log("CASE mentee request accepted");
          notificationsRows.push([
            date,
            `${e.mentorName
            } ha aceptado tu solicitud para enseñarte ${skillsFormatter(
              e.payload
            )}. ¡Es ahora tu mentor!`,
            [false, e._id],
          ]);
          break;

        case "mentee request rejected":
          console.log("CASE mentee request rejected");
          notificationsRows.push([
            date,
            `${e.menteeName
            } ha denegado tu solicitud de enseñarte ${skillsFormatter(
              e.payload
            )}.`,
            [false, e._id],
          ]);
          break;

        case "new objective":
          console.log("CASE new objective");
          notificationsRows.push([
            date,
            `${e.mentorName} te ha asignado un nuevo objetivo. Objetivo: ${e.payload}.`,
            [false, e._id],
          ]);
          break;

        case "completed objective":
          console.log("CASE objetive completed");
          notificationsRows.push([
            date,
            `${e.menteeName} ha completado el objectivo "${e.payload}".`,
            [false, e._id],
          ]);
          break;

        case "new meeting":
          console.log("CASE new meeting");
          notificationsRows.push([
            date,
            `${e.menteeName} ha organizado una nueva reunión para día ${e.payload} .`,
            [false, e._id],
          ]);
          break;

        default:
          return null;
      }
    });
    console.log("notificationsRows", notificationsRows)
    return (
      <Table
        rows={notificationsRows}
        titles="no titles"
        postMentoree={postMentoree}
        dismissNotification={dismissNotification}
      />
    );
  }

  return <div className="content">No tienes nuevas notificaciones</div>;
}
export default NotificationsContainer;
