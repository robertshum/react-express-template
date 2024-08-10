import pino from 'pino';
import config from './config.js';

const level = config.LOG_LEVEL;

/**
 * Pino is a powerful and efficient logging library for Node.js, suitable for both simple and complex logging needs. Its performance and flexibility make it a popular choice for production-grade applications. The JSON log format and structured logging approach facilitate better log management and analysis.
 */
if (!pino.levels.values[level]) {
  const validLevels = Object.keys(pino.levels.values).join(', ');
  throw new Error(`Log level must be one of: ${validLevels}`);
}

const logger = (name) => pino({ name, level });

export default logger;
