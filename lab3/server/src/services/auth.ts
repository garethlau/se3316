import { User } from '@prisma/client';
import { Response, CookieOptions } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NODE_ENV, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_NAME, REFRESH_TOKEN_SECRET } from '../config';
import prisma from '../lib/prisma';

const cookieOptions: CookieOptions =
  NODE_ENV === 'development'
    ? {
        httpOnly: false,
      }
    : {
        httpOnly: true,
        secure: true,
      };

export async function doesExist(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return false;
  return true;
}

export async function checkCredentials(username: string, password: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) return null;

  return user;
}

export async function create(username: string, password: string): Promise<User> {
  const hash = await bcrypt.hash(password, 8);
  const user = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });
  return user;
}

export function generateAccessToken(id: string) {
  const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  return accessToken;
}

export function generatRefreshToken(id: string) {
  const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });
  return refreshToken;
}

export function sendRefreshToken(res: Response, token: string): void {
  res.cookie(REFRESH_TOKEN_NAME, token, cookieOptions);
}
