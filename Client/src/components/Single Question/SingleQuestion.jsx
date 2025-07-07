import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axisoConfig";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import classes from "./SingleQuestion.module.css";
import PersonIcon from "@mui/icons-material/Person";

function SingleQuestion() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState([]);
  const answerDom = useRef();

  useEffect(() => {
    const fetchSingleQuestions = async () => {
      try {
        const { data } = await axios.get(`/questions/${questionid}`);
        // console.log(data);
        setQuestion(data.question);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAnswer = async () => {
      try {
        const { data } = await axios.get(`/answer/${questionid}`);
        // console.log(data);
        setAnswer(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleQuestions();
    fetchAnswer();
  }, [questionid]);

  async function handleSubmit(e) {
    e.preventDefault();
    const answerval = answerDom.current.value;

    if (!answerDom) {
      alert("Please provide your answer in the space");
      return;
    }
    try {
      await axios.post("/answer", {
        answer: answerval,
        questionid,
      });
      alert("Answer Posted successfully");
      window.location.reload();
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
    }
  }

  if (!question) return <p>Loading...</p>;

  return (
    <section className={`container-fluid ${classes.outerContainer}`}>
      <div className={`container ${classes.outerWrapper}`}>
        <h1>QUESTION</h1>
        <br />
        <div className={classes.question}>
          <h2>
            <ArrowCircleRightRoundedIcon color="primary" />
            {question.tag}
          </h2>
          <b>{question.title}</b>
        </div>
        <br />
        <hr />
        <div>
          <h3>
            <b>Answer From The Community</b>
          </h3>
          <hr />
          <ul className={classes.outer__container}>
            {answer.length === 0 ? (
              <p>No answers yet.</p>
            ) : (
              answer.map((ans, index) => (
                <li className={classes.listContainer} key={index}>
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
                      <span className={classes.actualUsername}>
                        {ans.username}
                      </span>
                    </div>
                    <div className={classes.center}>
                      <span className={classes.questionTitle}>
                        {ans.answer}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <br />
        <br />
        <div>
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <textarea
              ref={answerDom}
              type="text"
              placeholder="Your Answer..."
            />
            <br />
            <br />
            <button className={classes.postButton} type="submit">
              Post Answer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SingleQuestion;
