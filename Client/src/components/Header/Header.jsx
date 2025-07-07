import React, { useContext } from "react";
import headerpic from "../../images/header_image_Evangadi.png";
import { Appstate } from "../../App";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./header.module.css";

function Header() {
  const Navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(Appstate);
  function Logout() {
    localStorage.removeItem("token");
    Navigate("/login");
    window.location.reload();
  }
  function signin() {
    Navigate("/login");
  }

  function signup() {
    Navigate("/register");
  }

  return (
    <nav className={`navbar navbar-expand-lg d-block  ${classes.header} `}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className={`${classes.headerpic} ms-5`} src={headerpic} alt="" />
        </a>

        <div className="collapse navbar-collapse me-5 gap-5" id="navbarNav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                How it works
              </a>
            </li>
          </ul>
          {user ? (
            <button className={classes.headerButton} onClick={Logout}>
              Logout
            </button>
          ) : location.pathname === "/login" ? (
            <button onClick={signup} className={classes.headerButton}>
              sign up
            </button>
          ) : (
            <button onClick={signin} className={classes.headerButton}>
              sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
