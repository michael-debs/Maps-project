const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware");
const authController = require("../controllers/authController");

router.get("/:id", userController.getUser);
router.post("/", authController.register);
router.delete(
  "/:id",
  authenticationMiddleware.authenticateToken,
  authorizationMiddleware.authorizeUserAction,
  userController.deleteUser
);
router.put(
  "/:id",
  authenticationMiddleware.authenticateToken,
  authorizationMiddleware.authorizeUserAction,
  userController.updateUser
);

module.exports = router;
