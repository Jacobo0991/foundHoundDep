const express = require('express');
const router = express.Router();
const authRouter = require("../routes/auth.router");
const postRouter = require("../routes/post.router");
const userRouter = require("../routes/user.router");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);

module.exports = router;