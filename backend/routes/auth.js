const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");
// const authMiddleware = require("../middleware/auth");
const router = express.Router();
const bcrypt = require("bcrypt");

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // password matching
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });
    res.json({
      token,
      email: user.email,
      userid: user._id,
    });
  } catch (error) {
    s;
    console.error("Login Error:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user with same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: "Email is already in use" });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10); // Increase salt rounds for better security
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    res.status(200).send({
      message: "Registration successful!",
      user: {
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Error creating user" });
  }
});

// Middleware to protect routes
// router.use(authMiddleware);

module.exports = router;
