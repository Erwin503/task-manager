const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');
const checkRole = require('../middleware/checkRole');
const authenticate = require('../middleware/authenticate');


router.get('/', testsController.getTests);
router.post('/', authenticate, checkRole('Teacher'), testsController.createTest);
router.get('/:id', testsController.getTestById);
router.put('/:id', authenticate, checkRole('Teacher'), testsController.updateTest);
router.delete('/:id', authenticate, checkRole('Teacher'), testsController.deleteTest);
router.post('/:testId/check-answer', testsController.checkTestAnswer);

module.exports = router;
