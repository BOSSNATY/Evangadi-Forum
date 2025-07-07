import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axisoConfig";
import { Appstate } from "../../App";
import classes from "./postQuestion.module.css";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

function PostQuestion() {
  const [tag, setTag] = useState("");
  const Navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const { checkUser } = useContext(Appstate);

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    if (!titleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }
    try {
      await axios.post("/questions", {
        title: titleValue,
        description: descriptionValue,
        tag,
      });
      await checkUser();
      alert("Question Posted successfully");
      Navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
    }
  }

  return (
    <section className={`container-fluid ${classes.outerContainer}`}>
      <div className={`container ${classes.outerWrapper}`}>
        <div>
          <h2>Steps To Write A Good Question</h2>
          <div>
            <ul>
              <ArrowCircleRightRoundedIcon />
              Summerize your problems in a one-line-title.
              <br />
              <br />
              <ArrowCircleRightRoundedIcon />
              Describe your problem in more detail.
              <br />
              <br />
              <ArrowCircleRightRoundedIcon />
              Describe what you tried and what you expected to happen.
              <br />
              <br />
              <ArrowCircleRightRoundedIcon />
              Review your quesiton and post it here.
              <br />
              <br />
            </ul>
          </div>
        </div>
        <h1>Post Your Question</h1>
        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <div>
            <textarea ref={titleDom} type="text" placeholder="Quesiton Title" />
          </div>
          <br />
          <div className={classes.formDescription}>
            <textarea
              ref={descriptionDom}
              type="text"
              placeholder="Quesiton detail..."
            />
          </div>
          <br />
          <select value={tag} onChange={(e) => setTag(e.target.value)} required>
            <option value="" disabled>
              Select Tag
            </option>
            <option value="Javascript">JavaScript</option>
            <option value="React">React</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Nodejs">Node.js</option>
            <option value="AI">AI</option>
            <option value="Other">other</option>
          </select>
          <br />
          <br />
          <button className={classes.postButton} type="submit">
            Post Question
          </button>
        </form>
      </div>
    </section>
  );
}

export default PostQuestion;
