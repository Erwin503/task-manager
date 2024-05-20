const { Task } = require("../models/models");

// Получение всех задач (только id и text)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ attributes: ["id", "text"] });
    res.json({ data: tasks, message: "Tasks retrieved successfully" });
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

// Создание новой задачи
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ data: task, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

// Получение задачи по ID (только id и text)
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      attributes: ["id", "text"],
    });
    if (task) {
      res.json({ data: task, message: "Task retrieved successfully" });
    } else {
      res.status(404).json({ data: null, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

// Обновление задачи
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json({ data: task, message: "Task updated successfully" });
    } else {
      res.status(404).json({ data: null, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

// Удаление задачи
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ data: null, message: "Task deleted successfully" });
    } else {
      res.status(404).json({ data: null, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

// Получение задач по Topic ID
const getTasksByTopic = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { topicId: req.params.topicId },
      attributes: ["id", "text"],
    });
    res.json({
      data: tasks,
      message: "Tasks for topic retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

// Проверка ответа на правильность
const checkTaskAnswer = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      const isCorrect = task.answer === req.body.answer;
      res.json({
        data: { isCorrect },
        message: isCorrect ? "Answer is correct" : "Answer is incorrect",
      });
    } else {
      res.status(404).json({ data: null, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ data: null, message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByTopic,
  checkTaskAnswer,
};
