const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  postQuestion,
  getAllQuestion,
  getSingleQuestion,
} = require("../controller/questionController");

router.post("/questions", authMiddleware, postQuestion);

router.get("/questions", getAllQuestion);

router.get("/questions/:questionid", getSingleQuestion);

module.exports = router;
