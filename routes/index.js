const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter")
const topicRouter = require("./topicRouter")
const testRouter = require("./testRouter")

router.use("/user", userRouter);
router.use("/task", taskRouter);
router.use("/topic", topicRouter);
router.use("/test", testRouter);

module.exports = router;
