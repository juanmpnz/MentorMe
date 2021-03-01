import React from "react"
import PropTypes from "prop-types"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

export default function CircularStatic({ objectives }) {

  const checked = objectives.filter((e) => e.isCompleted)
  const progress = (checked.length / objectives.length) * 100
  console.log(objectives)
  return <CircularProgressWithLabel value={progress} />
}

function CircularProgressWithLabel(props) {
  return (
    <Box
      position="relative"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginBottom: "17px",
      }}
    >
      <CircularProgress style={{ color: "#a6d431" }} size="5em" variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography component="div" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
}
