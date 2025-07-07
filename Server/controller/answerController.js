const dbconnection = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  const { answer, questionid } = req.body;
  const { userid } = req.user;

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide your answer in the space" });
  }

  try {
    const [result] = await dbconnection.query(
      "INSERT INTO answers( userid,questionid,answer) VALUES (?,?,?)",
      [userid, questionid, answer]
    );
    return res.status(StatusCodes.CREATED).json({ questionid, answer });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong!" });
  }
}

async function getAnswer(req, res) {
  const { questionid } = req.params;
  try {
    const [result] = await dbconnection.query(
      `SELECT answers.answer, users.username
       FROM answers
       JOIN users ON answers.userid = users.userid
       WHERE answers.questionid = ?`,
      [questionid]
    );
    return res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong!" });
  }
}

module.exports = { postAnswer, getAnswer };
