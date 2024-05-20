const { Topic } = require('../models/models');

// Получение всех тем
const getTopics = async (req, res) => {
    try {
        const topics = await Topic.findAll();
        res.json({ data: topics, message: "Topics retrieved successfully" });
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Создание новой темы
const createTopic = async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        res.status(201).json({ data: topic, message: "Topic created successfully" });
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Получение темы по ID
const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id);
        if (topic) {
            res.json({ data: topic, message: "Topic retrieved successfully" });
        } else {
            res.status(404).json({ data: null, message: "Topic not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Обновление темы
const updateTopic = async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id);
        if (topic) {
            await topic.update(req.body);
            res.json({ data: topic, message: "Topic updated successfully" });
        } else {
            res.status(404).json({ data: null, message: "Topic not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Удаление темы
const deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id);
        if (topic) {
            await topic.destroy();
            res.json({ data: null, message: "Topic deleted successfully" });
        } else {
            res.status(404).json({ data: null, message: "Topic not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Получение тем, созданных пользователем по userId
const getTopicsByUser = async (req, res) => {
    try {
        const topics = await Topic.findAll({
            where: { userId: req.params.userId }
        });
        res.json({ data: topics, message: "Topics for user retrieved successfully" });
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

module.exports = {
    getTopics,
    createTopic,
    getTopicById,
    updateTopic,
    deleteTopic,
    getTopicsByUser,
};
