module.exports = {
  TASK_PRIORITIES: ['low', 'medium', 'high', 'urgent'],
  TASK_STATUSES: ['todo', 'in-progress', 'completed', 'cancelled'],
  TASK_CATEGORIES: ['work', 'personal', 'shopping', 'health', 'finance', 'other'],
  
  KAFKA_TOPICS: {
    TASK_CREATED: 'task-created',
    TASK_UPDATED: 'task-updated',
    TASK_DELETED: 'task-deleted',
    NOTIFICATION: 'notification',
  },
  
  CACHE_TTL: {
    SHORT: 300,    // 5 minutes
    MEDIUM: 1800,  // 30 minutes
    LONG: 3600,    // 1 hour
  },
};
