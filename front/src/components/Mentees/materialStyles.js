import { makeStyles } from "@material-ui/core/styles"

export const menteesCard = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}))

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
      borderRadius: "20px",
    },
    "& .MuiInputBase-root": {
      margin: "10px",
    },
    "& .MuiInputBase-input": {

    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#006400",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a6d431",
    },
  },
  acordionCenter: {
    "& .MuiAccordionDetails-root": {
      display: "none",
      padding: "8px 16px 16px",
    },
  },
})

export const useStylesAvatar = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
