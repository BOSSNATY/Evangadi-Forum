const dbconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

async function postQuestion(req, res) {
  const { title, description, tag } = req.body;
  const { userid } = req.user;
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information" });
  }

  try {
    const [question] = await dbconnection.query(
      "INSERT INTO questions ( userid, title, description,tag ) VALUES(?,?,?,?)",
      [userid, title, description, tag]
    );
    return res.status(StatusCodes.CREATED).json({ title, description });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong!" });
  }
}

async function getAllQuestion(req, res) {
  try {
    const [questions] = await dbconnection.query(
      "SELECT questions.*, users.username FROM questions JOIN users WHERE questions.userid = users.userid ORDER BY created_at DESC;"
    );

    if (questions.length == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something Went wrong",
    });
  }
}
async function getSingleQuestion(req, res) {
  const { questionid } = req.params;
  try {
    const [rows] = await dbconnection.query(
      "SELECT questions.*, users.username FROM questions JOIN users ON questions.userid = users.userid WHERE questionid = ?",
      [questionid]
    );
    if (!rows.length) {
      return res.status(404).json({ message: "Question not found" });
    }
    return res.status(200).json({ question: rows[0] });
  } catch (error) {
    console.error("Error in getSingleQuestion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { postQuestion, getAllQuestion, getSingleQuestion };
