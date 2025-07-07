import React from "react";
import Login from "../../components/Login/Login";
import { useLocation } from "react-router-dom";
import Register from "../../components/Register/Register";
import About from "../../components/About/About";
import classes from "./auth.module.css";
function Auth({ type }) {
  //   const location = useLocation();
  return (
    <div className={classes.auth}>
      <div className={classes.auth__Wrapper}>
        <div className={` ${classes.auth__outerWrapper}`}>
          <div className={`container ${classes.auth__innerWrapper} `}>
            <div className={`${classes.loginRegWrapper} `}>
              {type === "login" ? <Login /> : <Register />}
            </div>
            <div className={`${classes.aboutWrapper}`}>
              <About />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
