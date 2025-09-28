const { addEmailJob } = require('../workers/emailWorker');

class EmailService {
  /**
   * Send email using Bull queue
   * @param {string} email - Recipient email address
   * @param {string} type - Email type (signin, signup, reset, etc.)
   * @param {any} data - Email data
   * @param {number} selectedProductsLength - Optional parameter for product updates
   * @returns {Promise} - Job promise
   */
  async sendEmail(email, type, data, selectedProductsLength = null) {
    try {
      return await addEmailJob(email, type, data, selectedProductsLength);
    } catch (error) {
      console.error('EmailService: Failed to queue email:', error);
      throw error;
    }
  }

  /**
   * Send multiple emails
   * @param {Array} emails - Array of email objects {email, type, data, selectedProductsLength}
   * @returns {Promise} - Array of job promises
   */
  async sendBulkEmails(emails) {
    try {
      const jobs = emails.map(({ email, type, data, selectedProductsLength }) => 
        this.sendEmail(email, type, data, selectedProductsLength)
      );
      
      return await Promise.all(jobs);
    } catch (error) {
      console.error('EmailService: Failed to queue bulk emails:', error);
      throw error;
    }
  }
}

const emailService = new EmailService();
module.exports = emailService;