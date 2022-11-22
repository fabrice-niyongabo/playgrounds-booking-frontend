import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { adminSidebarTabs } from "../../../constants";

function Contents() {
  const classes = useStyles();
  const { activeTab } = useSelector((state) => state.tabs);
  return (
    <div className={classes.mainContainer}>
      {
        adminSidebarTabs.filter((item) => item.tabName === activeTab)[0]
          ?.component
      }
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
