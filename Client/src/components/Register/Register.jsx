import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axisoConfig";
import classes from "./register.module.css";

function Register() {
  const Navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("Registration successful. Please login to your account!");
      Navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
    }
  }
  return (
    <>
      <div className={classes.outerWrapper}>
        <div className={classes.innerWrapper}>
          <section className={`${classes.register}`}>
            <div>
              <h3>Join the Network</h3>
              <p>
                Already have an account?{" "}
                <Link className={classes.link} to="/login">
                  Sign in
                </Link>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={classes.inputag}>
                <input ref={userNameDom} type="text" placeholder="username" />
              </div>
              <br />
              <div className={classes.inputag}>
                <input
                  ref={firstNameDom}
                  type="text"
                  placeholder="first name"
                />
              </div>
              <br />
              <div className={classes.inputag}>
                <input ref={lastNameDom} type="text" placeholder="last name" />
              </div>
              <br />
              <div className={classes.inputag}>
                <input ref={emailDom} type="email" placeholder="email" />
              </div>
              <br />
              <div className={classes.inputag}>
                <input
                  ref={passwordDom}
                  type="password"
                  placeholder="password"
                />
              </div>
              <br />
              <br />
              <button type="submit">Register</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default Register;
