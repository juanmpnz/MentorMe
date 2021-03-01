import React, { useRef } from "react"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles } from "@material-ui/core/styles"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import AlertSnackBar from "../../utilities/alertSnackbar"


export const selectSkillsStyles = makeStyles({
  root: {
    maxWidth: "100%",
    borderRadius: 5,
    flexGrow: 1,
    display: "block",
    marginTop: "25px",
    backgroundColor: "rgba(22,40,60,1)",
    color: "white",
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "#a6d431",
    },
  },
})

function SelectSkills({ skillsList, subtitle, handleChange, handleSubmit, snackBar }) {
  const classes = selectSkillsStyles()
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />
  return (
    <div className="searchMentorContainer">
      <div className="searchMent">
        <h3>{subtitle}</h3>
        <Autocomplete
      
          multiple
          id="checkboxes-tags-demo"
          options={skillsList}
          onChange={(event, value) => handleChange(event, value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.name}
            </>
          )}
          style={{ width: "43vh" }}
          renderInput={(params) => {
       
            return <TextField {...params} variant="outlined" label="Skills" />
          }}
        />
        <Button style={{ flexGrow: "0" }} onClick={handleSubmit} variant="contained" className={classes.root}>
          Continuar
        </Button>
        {snackBar ? <AlertSnackBar key={snackBar.key} message={snackBar.msg} type={snackBar.type} /> : null}
      </div>
     

    </div>
  )
}
export default SelectSkills
