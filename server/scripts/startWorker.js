#!/usr/bin/env node

/**
 * Standalone script to start the email worker
 * This can be run as a separate process for better scalability
 */

require('dotenv').config();
const chalk = require('chalk');

// Import the email worker
require('../workers/emailWorker');

console.log(`${chalk.green('✓')} ${chalk.blue('Email worker started successfully')}`);
console.log(`${chalk.blue('Worker is listening for email jobs...')}`);

// Keep the process alive
process.on('SIGTERM', () => {
  console.log(`${chalk.yellow('!')} ${chalk.yellow('Received SIGTERM, shutting down gracefully...')}`);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log(`${chalk.yellow('!')} ${chalk.yellow('Received SIGINT, shutting down gracefully...')}`);
  process.exit(0);
});