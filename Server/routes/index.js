const express = require("express")
const router = express.Router()

// routes
const userRouter = require("./userRoutes")
const authRouter = require("./authRoutes")
const activityRouter = require("./activityRoutes")

router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/activity", activityRouter)

module.exports = router
