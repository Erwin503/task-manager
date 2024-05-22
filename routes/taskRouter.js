const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const checkRole = require("../middleware/checkRole");
const authenticate = require("../middleware/authenticate");

router.get("/", tasksController.getTasks);
router.post(
  "/",
  authenticate,
  checkRole("Teacher"),
  tasksController.createTask
);
router.get("/:id", tasksController.getTaskById);
router.put(
  "/:id",
  authenticate,
  checkRole("Teacher"),
  tasksController.updateTask
);
router.delete(
  "/:id",
  authenticate,
  checkRole("Teacher"),
  tasksController.deleteTask
);
router.get("/topic/:topicId", tasksController.getTasksByTopic);
router.post("/:id/check-answer", tasksController.checkTaskAnswer);
router.get(
  "/user",
  authenticate,
  checkRole("Teacher"),
  tasksController.getTasksByUser
);

module.exports = router;
