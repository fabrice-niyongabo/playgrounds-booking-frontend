import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../styles/topbar.scss";

function Topbar() {
  const { fullName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div
      className="topbar-main-container"
      style={{ cursor: "pointer" }}
      onClick={() => {
        // context.setActiveTab({ id: null, name: "profile" });
      }}
    >
      <div onClick={() => navigate("/")}>
        <img src={require("../../../assets/logo.png")} />
      </div>
      <div className="user-profile-container">
        <div className="profile-image-container">
          <AiOutlineUser size={20} />
        </div>
        <div className="username-container">{fullName}</div>
      </div>
    </div>
  );
}

export default Topbar;
