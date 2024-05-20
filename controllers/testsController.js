const { Test, TestAnswer, Topic } = require('../models/models');

// Получение всех тестов с ответами
const getTests = async (req, res) => {
    try {
        const tests = await Test.findAll({
            include: {
                model: TestAnswer,
                as: 'testAnswers',
                attributes: ['id', 'text']
            }
        });
        res.json({ data: tests, message: "Tests retrieved successfully" });
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Создание нового теста с ответами и привязкой к теме
const createTest = async (req, res) => {
    const { name, text, answers, topicId } = req.body;
    try {
        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(404).json({ data: null, message: "Topic not found" });
        }

        const test = await Test.create({ name, text, topicId });

        let correctAnswerCount = 0;
        for (let answer of answers) {
            if (answer.isCorrect) correctAnswerCount++;
        }

        if (correctAnswerCount !== 1) {
            return res.status(400).json({ data: null, message: "There must be exactly one correct answer" });
        }

        for (let answer of answers) {
            await TestAnswer.create({
                text: answer.text,
                isCorrect: answer.isCorrect,
                testId: test.id
            });
        }

        res.status(201).json({ data: test, message: "Test and answers created successfully" });
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Получение теста по ID с ответами
const getTestById = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id, {
            include: {
                model: TestAnswer,
                as: 'testAnswers',
                attributes: ['id', 'text']
            }
        });
        if (test) {
            res.json({ data: test, message: "Test retrieved successfully" });
        } else {
            res.status(404).json({ data: null, message: "Test not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Обновление теста
const updateTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            await test.update(req.body);
            res.json({ data: test, message: "Test updated successfully" });
        } else {
            res.status(404).json({ data: null, message: "Test not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Удаление теста
const deleteTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            await test.destroy();
            res.json({ data: null, message: "Test deleted successfully" });
        } else {
            res.status(404).json({ data: null, message: "Test not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

// Проверка правильности ответа
const checkTestAnswer = async (req, res) => {
    try {
        const testAnswer = await TestAnswer.findOne({ 
            where: { testId: req.params.testId, id: req.body.answerId }
        });

        if (testAnswer) {
            const isCorrect = testAnswer.isCorrect;
            res.json({ data: { isCorrect }, message: isCorrect ? "Answer is correct" : "Answer is incorrect" });
        } else {
            res.status(404).json({ data: null, message: "Answer not found" });
        }
    } catch (error) {
        res.status(500).json({ data: null, message: error.message });
    }
};

module.exports = {
    getTests,
    createTest,
    getTestById,
    updateTest,
    deleteTest,
    checkTestAnswer,
};
