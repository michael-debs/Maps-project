const userService = require("../services/userService");

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await userService.deleteUser({ id });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.findUserWithId({ id });
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
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await userService.updateUser({
      id,
      data: userData,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

module.exports = {
  deleteUser,
  getUser,
  updateUser,
};
