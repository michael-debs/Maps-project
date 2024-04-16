const express = require("express");
const router = express.Router();

const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get(
  "/validate-token",
  authenticationMiddleware.authenticateToken,
  authController.validateToken
);

module.exports = router;
