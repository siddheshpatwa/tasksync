const { checkOverdueTasks, dailyReminder } = require('../services/cronService');
const logger = require('../utils/logger');

const startScheduler = () => {
  logger.info('Starting task scheduler...');
  
  // Start cron jobs
  checkOverdueTasks.start();
  dailyReminder.start();
  
  logger.info('Scheduler started successfully');
};

module.exports = { startScheduler };
