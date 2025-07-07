const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid" });
    return;
  }
}

module.exports = authMiddleware;
