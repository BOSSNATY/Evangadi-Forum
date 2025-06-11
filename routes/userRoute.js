const express = require("express");
const router = express.Router();
// authMiddleware
const authMiddleware = require("../middleware/authmiddleware");

const { register, login, checkUser } = require("../controller/userController");

router.post("/register", register);

router.post("/login", login);

router.get("/check", authMiddleware, checkUser);

module.exports = router;
