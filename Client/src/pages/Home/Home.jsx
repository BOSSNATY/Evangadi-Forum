import React from "react";
import { useContext } from "react";
import { Appstate } from "../../App";
import AllQuestions from "../../components/AllQuestions/AllQuestions";
import { Link, useNavigate } from "react-router-dom";
import classes from "./home.module.css";

function Home() {
  const Navigate = useNavigate();

  const { user } = useContext(Appstate);
  // console.log(user);

  return (
    <div className={` ${classes.home__Wrapper}`}>
      <div className={`container ${classes.outer__Wrapper}`}>
        <div className={classes.first__Wrapper}>
          <Link to="/questions">
            <button className={classes.askButton}>Ask Question</button>
          </Link>
          <br />
          <br />
          <div>
            <h2 className={classes.username}>
              Welcome {user ? user.username : "Guest"}
            </h2>
          </div>
        </div>

        <div className={classes.questions}>
          <AllQuestions />
        </div>
      </div>
    </div>
  );
}

export default Home;
