import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";

function Contents() {
  const classes = useStyles();
  const { activeTab, tabs } = useSelector((state) => state.tabs);
  console.log(tabs);
  return (
    <div className={classes.mainContainer}>
      {tabs.filter((item) => item.tabName === activeTab)[0]?.component}
    </div>
  );
}

export default Contents;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    paddingTop: "5rem",
    paddingLeft: "1rem",
    width: "calc(100vw - 270px)",
    marginLeft: "250px",
    height: "100%",
  },
}));
