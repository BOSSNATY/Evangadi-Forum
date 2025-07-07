import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axisoConfig";
import classes from "./login.module.css";
import About from "../About/About";

function Login() {
  const Navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("Login successful! Welcome");
      Navigate("/");
      window.location.reload();

      localStorage.setItem("token", data.token);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data.msg);
    }
  }

  return (
    <>
      <div className={classes.outerWrapper}>
        <div className={classes.innerWrapper}>
          <section className={`${classes.login}`}>
            <div>
              <h3>Login to your account</h3>
              <p>
                Don't you have an account?{" "}
                <Link className={classes.link} to="/register">
                  Create a new account
                </Link>
              </p>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <div className={classes.inputag}>
                <input
                  ref={emailDom}
                  type="email"
                  placeholder="Email address"
                />
              </div>
              <br />
              <div className={classes.inputag}>
                <input
                  ref={passwordDom}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <br />
              <br />
              <button type="submit">Login</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
