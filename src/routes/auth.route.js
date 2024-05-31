import express from 'express';
import { body } from 'express-validator';
import { userLogin, userRegister } from '../controllers/user.controller.js';

const router = express.Router();

export const authValidator = [
  body('username').notEmpty().isString(),
  body('password').notEmpty().isString().isStrongPassword({
    minLength: 8,
    minUppercase: 2,
    minLowercase: 2,
    minSymbols: 2,
    minNumbers: 2,
  }),
];

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user
 */
router.post('/register', ...authValidator, userRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The logged in user
 */
router.post('/login', ...authValidator, userLogin);

export default router;
