import express from 'express';
import {
  createGame,
  deleteGame,
  getGameById,
  getGames,
  updateGame,
} from '../controllers/game.controller.js';
import { body, param } from 'express-validator';

const router = express.Router();

export const createValidator = [body('title').notEmpty().isString()];
export const paramsValidator = [param('id').exists()];

/**
 * @swagger
 * /game-titles:
 *   get:
 *     summary: Retrieve a list of game titles
 *     responses:
 *       200:
 *         description: A list of game titles
 */
router.get('/', getGames);

/**
 * @swagger
 * /game-titles/{id}:
 *   get:
 *     summary: Retrieve a single game title by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single game title
 *       404:
 *         description: Game title not found
 */
router.get('/:id', ...createValidator, getGameById);

/**
 * @swagger
 * /game-titles:
 *   post:
 *     summary: Create a new game title
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created game title
 */
router.post('/', ...createValidator, createGame);

/**
 * @swagger
 * /game-titles/{id}:
 *   put:
 *     summary: Update a game title by ID
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated game title
 *       404:
 *         description: Game title not found
 */
router.put('/:id', ...paramsValidator, updateGame);

/**
 * @swagger
 * /game-titles/{id}:
 *   delete:
 *     summary: Delete a game title by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Game title deleted
 *       404:
 *         description: Game title not found
 */
router.delete('/:id', ...paramsValidator, deleteGame);

export default router;
