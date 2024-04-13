const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../services/userService");

async function login(req, res) {
  try {
    const response = await loginUser(req.body);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

async function register(req, res) {
  try {
    const response = await registerUser(req.body);

    if (!response) {
      res.status(400).json("User already exists");
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

module.exports = {
  login,
  register,
};
