module.exports = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ msg: "please provide a username and password" });
  } else {
    next();
  }
};
