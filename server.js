const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);
const cors = require("cors");
const helmet = require("helmet");

const db = require("./users/user-model.js");
const validateCreds = require("./middleware/validateCreds.js");
const userRouter = require("./users/users-router.js");
const knexConfig = require("./data/dbConfig.js");

const server = express();
const port = 5000;
const sessionConfig = {
  name: "session",
  secret: "quakeisbetterthandoomfightme",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: false,
    httpOnly: true
  },
  store: new KnexStore({
    knex: knexConfig,
    tablename: "sessions",
    createTable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 30
  })
};

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true
};

server.use(helmet());
server.use(cors(corsConfig));
server.use(express.json());
server.use(session(sessionConfig));
server.use("/restricted", userRouter);

server.post("/register", validateCreds, async (req, res) => {
  let { username, password } = req.body;
  try {
    const hashed = bcrypt.hashSync(password, 14);
    password = hashed;
    await db.insert({ username, password });
    setSession(req, username);
    res.status(201).json({ msg: `welcome ${username}!` });
  } catch (error) {
    if (error.errno === 19) {
      res.status(400).json({ msg: `username '${username}' is unavailable` });
    }
    res.status(500).json({ error });
  }
});

server.post("/login", validateCreds, async (req, res) => {
  try {
    const userData = await db.findBy({ username: req.body.username });
    setSession(req, userData.username, userData.id);
    res.status(200).json({ msg: `welcome, ${req.body.username}!` });
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.get("/logout", async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(500).json({ msg: "failed to logout, please try again" });
        } else {
          res.status(200).json({ msg: "successfully logged out!" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "server error :(" });
  }
});

server.listen(port, () => console.log(`server listening on port ${port}`));

function setSession(req, username, id) {
  req.session.loggedIn = true;
  req.session.username = username;
  req.session.userID = id;
  return req;
}
