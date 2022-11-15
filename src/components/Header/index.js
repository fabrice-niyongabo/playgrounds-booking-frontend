import React, { useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { MdLogin, MdOutlineDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoSignIn } from "react-icons/go";

import "../../styles/header.scss";

function Header() {
  const navHeaderRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      if (window.scrollY > 500) {
        navHeaderRef?.current?.classList.add("fixed-header");
      } else {
        navHeaderRef?.current?.classList.remove("fixed-header");
      }
    });
  }, []);
  const { token, fullName, role } = useSelector((state) => state.user);
  return (
    <div className="header-main-container" ref={navHeaderRef}>
      <div className="log-container">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: 20,
            textTransform: "uppercase",
            color: "#f46a06",
          }}
          className="text-orange"
        >
          <span>Circle sportif</span>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">
              <FaHome size={20} color="#f46a06" />
              <span>Home</span>
            </Link>
          </li>

          {token && token !== "" && fullName !== "" ? (
            <>
              {role === "user" ? (
                <>
                  <li>
                    <Link to="/profile">
                      <FaRegUserCircle size={20} color="#f46a06" />
                      <span>{fullName.split(" ")[0]}</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard">
                      <MdOutlineDashboard size={20} color="#f46a06" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/logout">
                  <RiLogoutCircleLine size={20} color="#f46a06" />
                  <span>Logout</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">
                  <GoSignIn size={20} color="#f46a06" />
                  <span>SignUp</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <MdLogin size={20} color="#f46a06" />
                  <span>Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
