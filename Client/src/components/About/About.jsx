import React from "react";
import classes from "./about.module.css";
function About() {
  return (
    <div className={`${classes.outerWrapper} container`}>
      <div className={classes.about__container}>
        <p>About</p>
        <h1>Evangadi Networks Q&A</h1>
        <div className={classes.about__container_desc}>
          <p>
            No matter what stage of life you are in, whether you're just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps!
          </p>
          <p>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
