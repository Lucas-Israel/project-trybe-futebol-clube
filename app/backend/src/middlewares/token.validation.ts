import { Request, Response, NextFunction } from 'express';
import 'dotenv';
import * as jwt from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET || '';

export default async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ message: 'there needs to be a key' });
  const verifying = jwt.decode(auth);

  if (!verifying) return res.status(401).json({ message: 'Token must be a valid token' });

  next();
}
