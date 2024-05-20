const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter")
const topicRouter = require("./topicRouter")
const testRouter = require("./testRouter")

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/topics", topicRouter);
router.use("/tests", testRouter);

module.exports = router;
