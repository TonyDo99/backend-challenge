import jwt from 'jsonwebtoken';
import { AppDataSource } from '../model/index.js';

const userRepository = AppDataSource.getRepository('UserSchema');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    const dbUser = await userRepository.findOneBy({ id: user.id });
    if (!dbUser) return res.sendStatus(404);

    req.user = dbUser;
    next();
  });
};

export { authenticateToken };
