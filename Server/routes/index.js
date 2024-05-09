const express = require("express")
const router = express.Router()

// routes
const userRouter = require("./userRoutes")
const authRouter = require("./authRoutes")
const activityRouter = require("./activityRoutes")
const postRoutes = require("./postRoutes")

router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/activity", activityRouter)
router.use("/posts", postRoutes);

module.exports = router
