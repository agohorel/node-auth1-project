const bcrypt = require("bcryptjs");
const db = require("../users/user-model.js");

module.exports = async (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    try {
      const user = await db.findBy({ username }).first();
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ msg: "You shall not pass!" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ msg: "please provide valid credentials" });
  }
};
