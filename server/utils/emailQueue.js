const { emailQueue } = require('../workers/emailWorker');

/**
 * Utility functions for email queue management
 */

class EmailQueueManager {
  /**
   * Get queue statistics
   */
  async getQueueStats() {
    try {
      const waiting = await emailQueue.getWaiting();
      const active = await emailQueue.getActive();
      const completed = await emailQueue.getCompleted();
      const failed = await emailQueue.getFailed();

      return {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        total: waiting.length + active.length + completed.length + failed.length
      };
    } catch (error) {
      console.error('Failed to get queue stats:', error);
      throw error;
    }
  }

  /**
   * Clean completed and failed jobs
   */
  async cleanQueue() {
    try {
      await emailQueue.clean(24 * 60 * 60 * 1000, 'completed'); // Clean completed jobs older than 24 hours
      await emailQueue.clean(24 * 60 * 60 * 1000, 'failed'); // Clean failed jobs older than 24 hours
      console.log('Queue cleaned successfully');
    } catch (error) {
      console.error('Failed to clean queue:', error);
      throw error;
    }
  }

  /**
   * Pause the queue
   */
  async pauseQueue() {
    try {
      await emailQueue.pause();
      console.log('Email queue paused');
    } catch (error) {
      console.error('Failed to pause queue:', error);
      throw error;
    }
  }

  /**
   * Resume the queue
   */
  async resumeQueue() {
    try {
      await emailQueue.resume();
      console.log('Email queue resumed');
    } catch (error) {
      console.error('Failed to resume queue:', error);
      throw error;
    }
  }

  /**
   * Get failed jobs
   */
  async getFailedJobs() {
    try {
      return await emailQueue.getFailed();
    } catch (error) {
      console.error('Failed to get failed jobs:', error);
      throw error;
    }
  }

  /**
   * Retry failed jobs
   */
  async retryFailedJobs() {
    try {
      const failedJobs = await emailQueue.getFailed();
      const retryPromises = failedJobs.map(job => job.retry());
      await Promise.all(retryPromises);
      console.log(`Retried ${failedJobs.length} failed jobs`);
    } catch (error) {
      console.error('Failed to retry failed jobs:', error);
      throw error;
    }
  }
}

const emailQueueManager = new EmailQueueManager();
module.exports = emailQueueManager;