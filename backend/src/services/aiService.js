const axios = require('axios');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

// Parse natural language to extract task details
const parseTask = async (text) => {
  try {
    const response = await axios.post(`${AI_ENGINE_URL}/parse`, { text });
    return response.data;
  } catch (error) {
    // Fallback if AI engine is not available
    return {
      title: text,
      description: '',
      dueDate: null,
      priority: 'medium',
      category: 'other',
    };
  }
};

// Predict task priority based on content
const predictPriority = async (title, description, dueDate) => {
  try {
    const response = await axios.post(`${AI_ENGINE_URL}/predict-priority`, {
      title,
      description,
      dueDate,
    });
    return response.data.priority;
  } catch (error) {
    return 'medium';
  }
};

// Categorize task using AI
const categorizeTaskAI = async (title, description) => {
  try {
    const response = await axios.post(`${AI_ENGINE_URL}/categorize`, {
      title,
      description,
    });
    return response.data.category;
  } catch (error) {
    return 'other';
  }
};

module.exports = { parseTask, predictPriority, categorizeTaskAI };
