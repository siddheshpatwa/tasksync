const cron = require('node-cron');
const Task = require('../models/taskModel');
const logger = require('../utils/logger');

// Check for overdue tasks every hour
const checkOverdueTasks = cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    const overdueTasks = await Task.find({
      dueDate: { $lt: now },
      status: { $ne: 'completed' },
    });
    
    logger.info(`Found ${overdueTasks.length} overdue tasks`);
    // TODO: Send notifications
  } catch (error) {
    logger.error('Error checking overdue tasks:', error);
  }
});

// Daily task reminder at 9 AM
const dailyReminder = cron.schedule('0 9 * * *', async () => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const upcomingTasks = await Task.find({
      dueDate: { $gte: today, $lt: tomorrow },
      status: { $ne: 'completed' },
    });
    
    logger.info(`Found ${upcomingTasks.length} tasks due today`);
    // TODO: Send notifications
  } catch (error) {
    logger.error('Error sending daily reminders:', error);
  }
});

module.exports = { checkOverdueTasks, dailyReminder };
