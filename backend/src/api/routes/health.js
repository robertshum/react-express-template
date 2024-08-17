import { Router } from 'express';

const router = Router();

/**
 * @swagger
 *
 * tags:
 *   name: HealthCheck
 *   description: Health of server and uptime
 *
 * /health:
 *   get:
 *     tags: [HealthCheck]
 *     summary: Health check endpoint
 *     description: Returns the uptime of the server, a status message, and a timestamp.
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: string
 *                   description: The server uptime in days, hours, minutes, and seconds.
 *                   example: "1 days, 2 hours, 30 minutes, 45 seconds"
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                   example: "OK"
 *                 timestamp:
 *                   type: integer
 *                   description: Current server timestamp in milliseconds since Unix epoch.
 *                   example: 1625587200000
 *       503:
 *         description: Service unavailable, the server is unhealthy
 */
router.get('/health', async (_req, res, _next) => {

  const time = formatUptime(process.uptime());

  const healthcheck = {
    uptime: time,
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

const formatUptime = (uptimeInSeconds) => {
  const days = Math.floor(uptimeInSeconds / (24 * 60 * 60));
  uptimeInSeconds %= (24 * 60 * 60);

  const hours = Math.floor(uptimeInSeconds / (60 * 60));
  uptimeInSeconds %= (60 * 60);

  const minutes = Math.floor(uptimeInSeconds / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default router;