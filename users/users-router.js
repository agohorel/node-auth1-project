const express = require("express");
const validateUser = require("../middleware/validateUser");
const db = require("./user-model.js");

const router = express.Router();
router.use(validateUser);

router.get("/users", async (req, res) => {
  try {
    const users = await db.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/top-secret", async (req, res) => {
  try {
    res.status(200).send("aliens are real");
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
