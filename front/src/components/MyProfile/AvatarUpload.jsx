// https://openbase.io/js/react-avatar-edit
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "react-avatar-edit";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { setAvatar } from "../../redux/action-creators/currentUser";

export default function AvatarUpload() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [src, setSrc] = useState("");
  const [file, setFile] = useState(null);

  const onClose = () => {
    setFile(null);
  };

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 122500) {
      alert("File is too big!");
      e.target.value = "";
      setFile(null);
    } else {
      setFile(e.target.files[0]);
    }
  };
  console.log(file);
  const uploadHandler = () => {
    const fileData = new FormData();
    fileData.append("image", file, file.name);
    dispatch(setAvatar(fileData));
    history.push("/myprofile");
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item direction="row" justify="center" alignItems="center">
        <Avatar
          label="Seleccionar una foto"
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          width={375}
          height={295}
          src={src}
        />
        <p style={{ textAlign: "center", color: "gray" }}>
          <i>La imagen no debe superar los 60kbs</i>
        </p>

        {file !== null ? (
          <div className="upload">
            <div className="upim" />

            <Button
              style={{
                color: "#fff",
                border: "2px solid rgba(18,41,68,1)",
                marginBottom: "1.5rem",
                marginTop: "1rem",
                textDecoration: "none",
                borderRadius: "20px",
                background: "rgba(18,41,68,1)",
              }}
              type="submit"
              onClick={uploadHandler}
            >
              Subir foto
            </Button>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
}
