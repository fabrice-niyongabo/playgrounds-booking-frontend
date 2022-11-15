import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Contents from "./contents";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import "../../styles/dashboard.scss";
function Dashboard() {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  // if (role !== "admin") {
  //   navigate("/");
  //   return null;
  // }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Topbar />
      <Sidebar />
      <Contents />
    </div>
  );
}

export default Dashboard;
