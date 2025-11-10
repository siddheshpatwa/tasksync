const { producer } = require('../config/kafka');
const logger = require('../utils/logger');

const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    logger.info(`Message sent to topic ${topic}`);
  } catch (error) {
    logger.error('Error sending Kafka message:', error);
  }
};

const publishTaskCreated = async (task) => {
  await sendMessage('task-created', task);
};

const publishTaskUpdated = async (task) => {
  await sendMessage('task-updated', task);
};

const publishTaskDeleted = async (taskId) => {
  await sendMessage('task-deleted', { taskId });
};

module.exports = { publishTaskCreated, publishTaskUpdated, publishTaskDeleted };
