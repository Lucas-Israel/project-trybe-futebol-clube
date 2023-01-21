import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export async function findOne(req: Request, res: Response) {
  const { email, password } = req.body;
  const result = await UserService.findOne({ email, password });

  res.status(result.status).json(result.message);
}

export async function oi() { return 'oi'; }
