/**
 * Structured logger utility
 */
const logger = {
  info: (message, meta = {}) => {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? meta : '');
  },
  warn: (message, meta = {}) => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? meta : '');
  },
  error: (message, error = {}) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, error);
  },
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? meta : '');
    }
  }
};

module.exports = logger;
