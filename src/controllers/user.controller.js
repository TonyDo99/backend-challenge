import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pkg from 'lodash';
import { AppDataSource } from '../model/index.js';
import { HandlerResponse } from '../utils/response.js';

const { omit } = pkg;

// Inject repository
const userRepository = AppDataSource.getRepository('UserSchema');

/**
 * Registers a new user by saving the user data in the repository after hashing the password.
 *
 * @param {Request} req - The request object containing the user data in the body.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const userRegister = async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = userRepository.create({
      username: username,
      password: await bcrypt.hash(password, 10),
    });

    await userRepository.save(user);

    HandlerResponse(res.status(201), {
      status: true,
      data: omit(user, 'password'),
      message: 'User has register successfully !',
    });
  } catch (error) {
    HandlerResponse(res, { status: false, data: null, message: error.message });
  }
};

/**
 * Authenticates a user by validating the username and password, and returns a JWT token if successful.
 *
 * @param {Request} req - The request object containing the user credentials in the body.
 * @param {Response} res - The response object used to send back the data.
 * @returns {Promise<void>} A promise that resolves to void.
 */
const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findOneBy({ username });

  if (user == null || !(await bcrypt.compare(password, user.password))) {
    return HandlerResponse(res, {
      status: false,
      data: null,
      message: 'Invalid credentials',
    });
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    }
  );

  return HandlerResponse(res.status(200), {
    status: true,
    data: { accessToken },
    message: 'Access token',
  });
};

export { userRegister, userLogin };
