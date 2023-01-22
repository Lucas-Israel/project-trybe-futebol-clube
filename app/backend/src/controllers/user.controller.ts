import { Request, Response } from 'express';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service';
import { IUserDataValues } from '../interfaces/User.Interfaces';

const secret = process.env.JWT_SECRET || '';

export async function findOne(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await UserService.findOne({ email, password });

  res.status(result.status).json(result.message);
}

export async function role(req: Request, res: Response) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(404).json({ message: 'No token' });
  const token = (jwt.verify(authorization, secret) as IUserDataValues).dataValues;

  return res.status(200).json({ role: token.role });
}
