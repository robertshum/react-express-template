 import { Router } from 'express';

import PizzaModelService from '../../services/pizzamodel.js';
import { requireUser } from '../middlewares/auth.js';
import { requireSchema } from '../middlewares/validate.js';
import { pizzaModelSchema, pizzaArraySchema } from '../schemas/pizzamodel.js';

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: PizzaModel
 *   description: API for managing PizzaModel objects
 *
 * /pizza-model:
 *   get:
 *     tags: [PizzaModel]
 *     summary: Get all the PizzaModel objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of PizzaModel objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PizzaModel'
 */
router.get('', async (req, res, next) => {
  try {
    const results = await PizzaModelService.list();
    res.json(results);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /pizza-model:
*   post:
 *     tags: [PizzaModel]
 *     summary: Create a new PizzaModel
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PizzaModel'
 *     responses:
 *       201:
 *         description: The created PizzaModel object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PizzaModel'
 */
router.post('', requireSchema(pizzaModelSchema), async (req, res, next) => {
  try {
    const obj = await PizzaModelService.create(req.validatedBody);
    res.status(201).json(obj);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /pizza-model/{id}:
 *   get:
 *     tags: [PizzaModel]
 *     summary: Get a PizzaModel by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: PizzaModel object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PizzaModel'
 */
router.get('/:id', async (req, res, next) => {
  try {

    // cannot be converted to a number
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: 'Malformed id' });
    }

    const obj = await PizzaModelService.get(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /pizza-model/{id}:
 *   put:
 *     tags: [PizzaModel]
 *     summary: Update PizzaModel with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PizzaModel'
 *     responses:
 *       200:
 *         description: The updated PizzaModel object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PizzaModel'
 */
router.put('/:id', requireSchema(pizzaModelSchema), async (req, res, next) => {
  try {

    // cannot be converted to a number
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: 'Malformed id' });
    }

    const obj = await PizzaModelService.update(req.params.id, req.validatedBody);
    if (obj) {
      res.status(200).json(obj);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /pizza-model/{id}:
 *   delete:
 *     tags: [PizzaModel]
 *     summary: Delete PizzaModel with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *        description: OK, object deleted
 */
router.delete('/:id', async (req, res, next) => {
  try {
    // cannot be converted to a number
    if (isNaN(Number(req.params.id))) {
      return res.status(400).json({ error: 'Malformed id' });
    }

    const success = await PizzaModelService.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Not found, nothing deleted' });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

export default router;
