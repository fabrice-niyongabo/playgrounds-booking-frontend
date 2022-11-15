import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import "../../../styles/topbar.scss";

function Topbar() {
  const { fullName } = useSelector((state) => state.user);
  return (
    <div
      className="topbar-main-container"
      style={{ cursor: "pointer" }}
      onClick={() => {
        // context.setActiveTab({ id: null, name: "profile" });
      }}
    >
      <div>
        <a href="/home">
          <img src={require("../../../assets/logo.png")} />
        </a>
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
