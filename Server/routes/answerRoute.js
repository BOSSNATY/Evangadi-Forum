const express = require("express");
const router = express.Router();
// authMiddleware
const authMiddleware = require("../Server/middleware/authmiddleware");

const {
  postAnswer,
  getAnswer,
} = require("../Server/controller/answerController");

router.post("/answer", authMiddleware, postAnswer);

router.get("/answer/:questionid", getAnswer);

module.exports = router;
