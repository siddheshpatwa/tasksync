const { consumer } = require('../config/kafka');
const logger = require('../utils/logger');

const runNotificationWorker = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notification', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const notification = JSON.parse(message.value.toString());
      logger.info('Processing notification:', notification);

      // TODO: Send email, push notification, etc.
      // Example: sendEmail(notification.email, notification.subject, notification.body);
    },
  });
};

module.exports = { runNotificationWorker };
