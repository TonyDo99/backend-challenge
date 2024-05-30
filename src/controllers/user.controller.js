import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { AppDataSource } from '../model/index.js';
import { HandlerResponse } from '../utils/error.js';

// Inject repository
const userRepository = AppDataSource.getRepository('UserSchema');

const userRegister = async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = userRepository.create({
      username: username,
      password: await bcrypt.hash(password, 10),
    });

    await userRepository.save(user);

    HandlerResponse(res, {
      status: true,
      data: omit(user, 'password'),
      message: 'User has register successfully !',
    });
  } catch (error) {
    HandlerResponse(res, { status: false, data: null, message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findOneBy({ username });

  if (user == null || !(await user.checkPassword(password))) {
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

  return HandlerResponse(res, {
    status: true,
    data: { accessToken },
    message: 'Access token',
  });
};

export { userRegister, userLogin };
