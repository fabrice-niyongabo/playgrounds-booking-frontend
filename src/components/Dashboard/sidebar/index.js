import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAcativeTab } from "../../../actions/tabs";
import { adminSidebarTabs } from "../../../constants";

function Sidebar() {
  const { activeTab } = useSelector((state) => state.tabs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar-container">
        <ul className="menu-container" style={{ marginTop: "1.5rem" }}>
          {adminSidebarTabs.map((item, positon) => (
            <li
              key={positon}
              className={activeTab === item.tabName ? "active" : ""}
              onClick={() => {
                dispatch(setAcativeTab(item.tabName));
              }}
            >
              {item.tabIcon}
              <span>{item.tabLabel}</span>
            </li>
          ))}
        </ul>
        <div className="footer">
          <div className="footer-contents" onClick={() => navigate("/logout")}>
            <span>Logout</span>
            <FiLogOut />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
