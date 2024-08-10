import { Router } from 'express';

import UserService from '../../services/user.js';
import urls from '../urls.js';
import { requireUser } from '../middlewares/auth.js';
import { requireSchema } from '../middlewares/validate.js';
import { changePasswordSchema, loginSchema } from '../schemas/auth.js';

const router = Router();

/** @swagger
 *
 * tags:
 *   name: Authentication
 *   description: User authentication API
 *
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate with the service
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginSchema'
 *     responses:
 *       200:
 *         description: Successful login, with user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, incorrect login credentials
 */
router.post(urls.auth.login, requireSchema(loginSchema), async (req, res) => {
  const { email, password } = req.validatedBody;

  const user = await UserService.authenticateWithPassword(email, password);

  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

router.get(urls.auth.login, (req, res) => {
  res.status(405).json({ error: 'Login with POST instead' });
});


// all auth routes after this can rely on existence of req.user
router.use(requireUser);

/** @swagger
 *
 * /auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Log out of the service - invalidate auth token
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Successful logout, token invalidated
 */
router.post(urls.auth.logout, async (req, res) => {
  await UserService.regenerateToken(req.user);
  res.status(204).send();
});

router.get(urls.auth.logout, (req, res) => {
  res.status(405).json({ error: 'Logout with POST instead' });
});

router.post(
  urls.auth.changePassword,
  requireSchema(changePasswordSchema),
  async (req, res) => {
    const { password } = req.validatedBody;

    await UserService.setPassword(req.user, password.toString());
    res.status(204).send();
  },
);

export default router;
