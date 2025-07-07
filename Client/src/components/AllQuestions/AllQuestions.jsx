import React from "react";
import axios from "../../axisoConfig";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import classes from "./allQuestion.module.css";

function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await axios.get("/questions");
        // console.log(data);
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, []);

  return (
    <div className={classes.wrapper}>
      <ul className={classes.outer__container}>
        {questions.map((q) => (
          <li className={classes.listContainer} key={q.questionid}>
            <Link
              className={classes.titleLink}
              to={`/questions/${q.questionid}`}
            >
              <div className={classes.row}>
                <div className={classes.left}>
                  <PersonIcon
                    style={{
                      width: " 60px",
                      height: "60px",
                      "border-radius": "50%",
                      border: "1px solid #0a2c54",
                    }}
                    className={classes.avatarIcon}
                  />
                  <span className={classes.actualUsername}>{q.username}</span>
                </div>
                <div className={classes.center}>
                  <span className={classes.questionTitle}>{q.title}</span>
                </div>
                <div className={classes.right}>
                  <ChevronRightIcon />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllQuestions;
