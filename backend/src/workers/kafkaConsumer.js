const { consumer } = require('../config/kafka');
const logger = require('../utils/logger');

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: ['task-created', 'task-updated', 'task-deleted'], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());
      logger.info(`Received message from topic ${topic}:`, value);

      switch (topic) {
        case 'task-created':
          // Handle task creation
          logger.info('Task created:', value);
          break;
        case 'task-updated':
          // Handle task update
          logger.info('Task updated:', value);
          break;
        case 'task-deleted':
          // Handle task deletion
          logger.info('Task deleted:', value);
          break;
        default:
          logger.warn('Unknown topic:', topic);
      }
    },
  });
};

module.exports = { runConsumer };
