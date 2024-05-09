const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const {
  authorizeUserAction,
} = require("../middlewares/authorizationMiddleware");
const {
  authenticateToken,
} = require("../middlewares/authenticationMiddleware");

router.get("/", activityController.getAllActivities);
router.get("/:id", activityController.getActivityById);
router.post("/", authenticateToken, activityController.createActivity);
router.put(
  "/:id",
  authenticateToken,
  activityController.updateActivity
);
router.delete(
  "/:id",
  authenticateToken,
  activityController.deleteActivity
);

module.exports = router;
