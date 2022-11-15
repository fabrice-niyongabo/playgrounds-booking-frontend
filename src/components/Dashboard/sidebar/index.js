import React from "react";
import { AiFillDownSquare, AiFillFund } from "react-icons/ai";
import { FiSettings, FiLogOut, FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAcativeTab } from "../../../actions/tabs";

function Sidebar() {
  const { tabs, activeTab } = useSelector((state) => state.tabs);
  const navigate = useNavigate();
  return (
    <>
      <div className="sidebar-container">
        <ul className="menu-container" style={{ marginTop: "1.5rem" }}>
          {tabs.map((item, positon) => (
            <li
              key={positon}
              className={activeTab === item.tabName ? "active" : ""}
              onClick={() => {
                setAcativeTab(item.tabName);
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
      {/* <AddSourceOfMoney
        showSourceOfMoneyModal={showSourceOfMoneyModal}
        handleCloseSourceOfMoneyModal={handleCloseSourceOfMoneyModal}
      /> */}
    </>
  );
}

export default Sidebar;
