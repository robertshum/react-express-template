import logger from '../../utils/log.js';
import config from '../../utils/config.js';

const log = logger('api:middleware');
const showError = config.NODE_ENV !== 'production';

/* 404 for the missing endpoints
 */
export const handle404 = (req, res) => {
  const { method, originalUrl } = req;
  log.info({ method, originalUrl }, `Unhandled API request ${method} ${originalUrl}`);
  res.status(404).json({ error: 'Resource not found or unsupported HTTP method' });
};

/* 500 in case we have an error in one of our route handlers
 * Create unique error ID (see below)
 */
export const handleError = (error, req, res) => {
  const { method, originalUrl } = req;

  // convert from 0-1, truncates the '0.', so left with '123456789' for ex:
  // then converts it to base 64 -> characters from a-z, A-Z, 0-9.
  // not guaranteed to be unique but close enough
  const errorId = Buffer.from(Math.random().toString().substr(2, 9)).toString('base64');
  log.error({ method, originalUrl, error, errorId }, `Error handling: ${method} ${originalUrl}`);

  if (showError) {
    res.status(500).json({ error, errorId });
  } else {
    res.status(500).json({ error: `Server error (ID=${errorId}), please try again later` });
  }
};
