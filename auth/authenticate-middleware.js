/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../secrets.js");

module.exports = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    res.status(401).json({ message: "authorization header must be given" });
    return;
  }
  try {
    if (!jwt.verify(req.headers.authorization, secrets.jwtSecret)) {
      res.status(401).json({ message: "authorization header is invalid" });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: "authorization header is invalid" });
    return;
  }
  req.token = jwt.decode(req.headers.authorization);
  next();
};
