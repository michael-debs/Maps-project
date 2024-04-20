const jwt = require("jsonwebtoken");
const {
  registerUser,
  loginUser,
  findUserWithId,
} = require("../services/userService");

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

async function validateToken(req, res) {
  try {
    const { id } = req.user;
    const token = req.token
    const user = await findUserWithId({ id });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

module.exports = {
  login,
  register,
  validateToken,
};
