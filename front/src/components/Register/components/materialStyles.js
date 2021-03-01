import { makeStyles } from "@material-ui/core/styles"

export const formUserDataStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 5,
    flexGrow: 1,
    marginTop: 20,
    backgroundColor: "rgba(22,40,60,1)",
    color: "white",
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "#a6d431",
    },
    "& .MuiTextField-root": {
      width: "25ch",
    },
    ".MuiMobileStepper-dotActive": {
      backgroundColor: "black",
    },
    "& .MuiButton-label" : {
      color: "white"
    },
  },
  formLogininput: {
    "& .MuiInputLabel-formControl": {
      left: "11px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "4%",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "2em",
    },
    "& .MuiInputBase-root": {
      margin: "10px",
    },
    "& .MuiInputBase-input": {
      width: "18rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#006400",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a6d431",
    },
  },
  arrow: {
    "& .MuiButton-label": {
      color: "#fff",
    },
  },
})

export const formUserNewStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    ".MuiMobileStepper-dotActive": {
      backgroundColor: "black",
    },
  },
  formLogininput: {
    "& .MuiInputLabel-formControl": {
      left: "11px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "4%",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "2em",
    },
    "& .MuiInputBase-root": {
      margin: "10px",
    },
    "& .MuiInputBase-input": {
      width: "18rem",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#006400",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a6d431",
    },
    "& .MuiButton-label": {
      color: "#fff",
    },
  },
}))

export const formUserSaveStyles = makeStyles({
  root: {
    maxWidth: "100%",
    borderRadius: 5,
    flexGrow: 1,
    backgroundColor: "rgba(22,40,60,1)",
    color: "white",
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "#a6d431",
    },
    "& .MuiButton-label": {
      color: "#fff",
    },
  },
})

export const formUserSkillsStyles = makeStyles({
  root: {
    maxWidth: "100%",
    borderRadius: 5,
    flexGrow: 1,
    backgroundColor: "rgba(22,40,60,1)",
    color: "white",
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "#a6d431",
    },
    "& .MuiButton-label": {
      color: "#fff",
    },
  },
  arrerglo: {
    "& .MuiAutocomplete-inputRoot": {
      borderRadius: "2em",
    },
  },
})

export const formUserSuccessStyles = makeStyles({
  root: {
    maxWidth: "100%",
    borderRadius: 5,
    flexGrow: 1,
    backgroundColor: "rgba(22,40,60,1)",
    color: "white",
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "#a6d431",
    },
    "& .MuiButton-label": {
      color: "#fff",
    },
  },
})
