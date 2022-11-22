import { makeStyles } from "@mui/styles";
import React from "react";

function ImageLoader() {
  const classes = useStyles();
  return (
    <div className={classes.dFlex}>
      <img src={require("../../assets/loader.gif")} />
      <small>
        <b>Loading...</b>
      </small>
    </div>
  );
}

export default ImageLoader;

const useStyles = makeStyles((theme) => ({
  dFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));
