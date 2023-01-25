import { Request, Response } from 'express';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import { IUserComplete } from '../interfaces/User.Interfaces';
import UserModel from '../database/models/UserModel';

const secret = process.env.JWT_SECRET || '';

export default class UserController {
  static async findOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const a = new UserService(UserModel);
    const result = await a.findOne({ email, password });

    res.status(result.status).json(result.message);
  }

  static async role(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(404).json({ message: 'No token' });
    const { role } = jwt.verify(authorization, secret) as IUserComplete;

    return res.status(200).json({ role });
  }
}
