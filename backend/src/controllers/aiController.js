const { parseTask, predictPriority, categorizeTaskAI } = require('../services/aiService');

// @desc    Parse natural language task
// @route   POST /api/ai/parse
// @access  Private
const parseNaturalLanguage = async (req, res) => {
  try {
    const { text } = req.body;
    const parsedTask = await parseTask(text);
    res.json(parsedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Suggest task priority
// @route   POST /api/ai/suggest-priority
// @access  Private
const suggestPriority = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const priority = await predictPriority(title, description, dueDate);
    res.json({ priority });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Categorize task
// @route   POST /api/ai/categorize
// @access  Private
const categorizeTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const category = await categorizeTaskAI(title, description);
    res.json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { parseNaturalLanguage, suggestPriority, categorizeTask };
