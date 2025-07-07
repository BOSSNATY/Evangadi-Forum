const express = require("express");
const router = express.Router();
const authMiddleware = require("../Server/middleware/authmiddleware");

const {
  postQuestion,
  getAllQuestion,
  getSingleQuestion,
} = require("../Server/controller/questionController");

router.post("/questions", authMiddleware, postQuestion);

router.get("/questions", getAllQuestion);

router.get("/questions/:questionid", getSingleQuestion);

module.exports = router;
