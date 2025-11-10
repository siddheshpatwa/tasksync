const express = require('express');
const router = express.Router();
const { parseNaturalLanguage, suggestPriority, categorizeTask } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/parse', protect, parseNaturalLanguage);
router.post('/suggest-priority', protect, suggestPriority);
router.post('/categorize', protect, categorizeTask);

module.exports = router;
