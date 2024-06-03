const userService = require("../services/userService");

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    await userService.deleteUser({ id: userId });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await userService.findUserWithId({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
async function updateUser(req, res) {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const updatedUser = await userService.updateUser({
      id: userId,
      data: userData,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

async function getUserPostsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const userPosts = await userService.getUserPostsByUserId(userId);
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

module.exports = {
  deleteUser,
  getUser,
  updateUser,
  getUserPostsByUserId,
};
