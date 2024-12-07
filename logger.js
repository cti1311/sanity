const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;

// Define custom format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info', // Default log level
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat // Use the custom format
  ),
  transports: [
    new transports.Console(), // Log to the console
    new DailyRotateFile({
      dirname: 'logs', // Directory where logs will be stored
      filename: 'app-%DATE%.log', // Log file name pattern
      datePattern: 'YYYY-MM-DD', // Daily rotation pattern
      maxSize: '20m', // Optional: Maximum size of a single log file
      maxFiles: '30d', // Retain logs for 30 days
    }),
  ],
});

module.exports = logger;
