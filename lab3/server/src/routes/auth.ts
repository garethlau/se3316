import jwt from 'jsonwebtoken';
import { Router } from 'express';
import prisma from '../lib/prisma';
import {
  checkCredentials,
  create,
  doesExist,
  generateAccessToken,
  generatRefreshToken,
  sendRefreshToken,
} from '../services/auth';
import { REFRESH_TOKEN_SECRET } from '../config';

const router = Router();

router.post('/login', async (req, res, next) => {
  const password = req.body.password as string;
  const username = req.body.username as string;

  try {
    if (!(await doesExist(username))) {
      return res.status(404).send({ message: 'This username does not exist.' });
    }
    const user = await checkCredentials(username, password);
    if (!user) {
      return res.status(403).send({ message: 'Incorrect password.' });
    }

    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generatRefreshToken(user.id.toString());

    sendRefreshToken(res, refreshToken);
    return res.status(200).send({ accessToken, message: 'Logged in successfully.' });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (await doesExist(username)) {
      return res.status(403).send({ message: 'This username is already taken.' });
    }

    const user = await create(username, password);
    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generatRefreshToken(user.id.toString());
    sendRefreshToken(res, refreshToken);

    return res.status(200).send({ accessToken, message: 'Signed up successfully.' });
  } catch (error) {
    next(error);
  }
});

router.get('/refresh-token', async (req, res, next) => {
  const token = req.cookies[REFRESH_TOKEN_SECRET];
  if (!token) {
    return res.status(401).send({ accessToken: '' });
  }
  let payload: any;

  try {
    payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token.' });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) {
    return res.status(401).send({ message: 'Invalid token.' });
  }
  const accessToken = generateAccessToken(user.id.toString());
  const refreshToken = generatRefreshToken(user.id.toString());
  sendRefreshToken(res, refreshToken);
  return res.status(200).send({ accessToken });
});
router.get('/logout', (req, res) => {
  res.clearCookie(REFRESH_TOKEN_SECRET);
  return res.status(200).send();
});

export default router;
