import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ACCESS_TOKEN_SECRET } from '../config';

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).send();
  }

  try {
    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    res.locals.id = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).send();
  }
}
