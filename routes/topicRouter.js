const express = require("express");
const router = express.Router();
const topicsController = require("../controllers/topicsController");
const checkRole = require("../middleware/checkRole");
const authenticate = require("../middleware/authenticate");

router.get("/", topicsController.getTopics);
router.post(
  "/",
  authenticate,
  checkRole("Teacher"),
  topicsController.createTopic
);
router.get("/:id", topicsController.getTopicById);
router.put(
  "/:id",
  authenticate,
  checkRole("Teacher"),
  topicsController.updateTopic
);
router.delete(
  "/:id",
  authenticate,
  checkRole("Teacher"),
  topicsController.deleteTopic
);
router.get("/user", topicsController.getTopicsByUser);

module.exports = router;
