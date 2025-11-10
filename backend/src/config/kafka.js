const { Kafka } = require('kafkajs');
const logger = require('../utils/logger');

const kafka = new Kafka({
  clientId: 'tasksync-ai',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'tasksync-group' });

const connectKafka = async () => {
  try {
    await producer.connect();
    logger.info('Kafka Producer Connected');
  } catch (error) {
    logger.error('Kafka Connection Error', error);
  }
};

module.exports = { kafka, producer, consumer, connectKafka };
