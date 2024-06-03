const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");
const authController = require("../controllers/authController");

router.get("/:userId", userController.getUser);
router.get("/:userId/posts", userController.getUserPostsByUserId);
router.post("/", authController.register);
router.delete(
  "/:userId",
  authenticationMiddleware.authenticateToken,
  authorizationMiddleware.authorizeUserAction,
  userController.deleteUser
);
router.put(
  "/:userId",
  authenticationMiddleware.authenticateToken,
  authorizationMiddleware.authorizeUserAction,
  userController.updateUser
);

module.exports = router;
