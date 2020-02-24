const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./users/user-model.js");
const validateCreds = require("./middleware/validateCreds.js");
const validateUser = require("./middleware/validateUser.js");

const server = express();
const port = 5000;

server.use(express.json());

server.get("/users", validateUser, async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.post("/register", validateCreds, async (req, res) => {
  let { username, password } = req.body;
  try {
    const hashed = bcrypt.hashSync(password, 14);
    password = hashed;
    await db.insert({ username, password });
    res.status(201).json({ msg: `welcome ${username}!` });
  } catch (error) {
    if (error.errno === 19) {
      res.status(400).json({ msg: `username '${username}' is unavailable` });
    }
    res.status(500).json({ error });
  }
});

server.post("/login", [validateCreds, validateUser], async (req, res) => {
  try {
    res.status(200).json({ msg: `welcome, ${req.body.username}!` });
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.listen(port, () => console.log(`server listening on port ${port}`));
