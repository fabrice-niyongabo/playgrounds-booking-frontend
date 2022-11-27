import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Contents from "./contents";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import "../../styles/dashboard.scss";
import FullPageLoader from "../full-page-loader";
function Dashboard() {
  const navigate = useNavigate();
  const { showLoader } = useSelector((state) => state.fullPageLoader);
  const { role } = useSelector((state) => state.user);
  if (role !== "admin") {
    // navigate("/");
    window.location = "/profile"
    return null;
  }

  return (
    <>
      <div style={{ position: "relative", height: "100vh" }}>
        <Topbar />
        <Sidebar />
        <Contents />
      </div>
      <FullPageLoader isLoading={showLoader} />
    </>
  );
}

export default Dashboard;
