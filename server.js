const express = require("express");
const db = require("./users/user-model");

const server = express();
const port = 5000;

server.use(express.json());

server.get("/users", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

server.post("/register", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

server.post("/login", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

server.listen(port, () => console.log(`server listening on port ${port}`));
