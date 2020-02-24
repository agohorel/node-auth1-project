const bcrypt = require("bcryptjs");
const db = require("../users/user-model.js");

module.exports = async (req, res, next) => {
  let user, pass;
  if (req.headers.username && req.headers.password) {
    user = req.headers.username;
    pass = req.headers.password;
  } else {
    user = req.body.username;
    pass = req.body.password;
  }

  if (user && pass) {
    try {
      const userData = await db.findBy({ username: user }).first();
      if (userData && bcrypt.compareSync(pass, userData.password)) {
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
