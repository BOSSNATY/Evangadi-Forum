const express = require("express");
const router = express.Router();
// authMiddleware
const authMiddleware = require("../middleware/authMiddleware");

const { postAnswer, getAnswer } = require("../controller/answerController");

router.post("/answer", authMiddleware, postAnswer);

router.get("/answer/:questionid", getAnswer);

module.exports = router;
