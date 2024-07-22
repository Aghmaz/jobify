const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");
// const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, "secretKey", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware to protect routes
// router.use(authMiddleware);

module.exports = router;
