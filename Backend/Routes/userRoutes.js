const express = require("express");
const router = express.Router();
const { User } = require("../Model/userModel"); // Import the User model
const bcrypt = require("bcrypt");

// Create a new user with password hashing
router.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: "Failed to create a new user" });
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match, user is authenticated
      return res.status(200).json({ _id: user._id });
    } else {
      // Passwords don't match, authentication failed
      return res.status(401).json({ error: "Wrong Password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Get a user by ID
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by their MongoDB ObjectId
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user data
    res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Failed to retrieve user by ID" });
  }
});

module.exports = router;
