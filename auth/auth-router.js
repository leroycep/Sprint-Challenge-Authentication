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

  db("users")
    .insert(creds, "id")
    .then((ids) => {
      return db("users").select("id", "username").where({ id: ids[0] }).first();
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
