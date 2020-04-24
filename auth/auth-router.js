const router = require("express").Router();

const db = require("../database/dbConfig.js");

router.post("/register", (req, res) => {
  const creds = req.body;
  if (creds.username === undefined || creds.password === undefined) {
    res
      .status(400)
      .json({ errorMessage: "username and password are required" });
    return;
  }
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
