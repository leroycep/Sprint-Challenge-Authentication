const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secrets = require("../secrets.js");
const db = require("../database/dbConfig.js");

router.post("/register", (req, res) => {
  const creds = req.body;
  if (creds.username === undefined || creds.password === undefined) {
    res
      .status(400)
      .json({ errorMessage: "username and password are required" });
    return;
  }

  const user = {
    username: creds.username,
    password: bcrypt.hashSync(creds.password, secrets.hashRounds),
  };

  db("users")
    .insert(user, "id")
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
  db("users")
    .select()
    .where({ username: req.body.username })
    .first()
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ errorMessage: "Incorrect password" });
        }
      } else {
        res
          .status(404)
          .json({ errorMessage: "No user with the specified username" });
      }
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
