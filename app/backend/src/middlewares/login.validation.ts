import { Request, Response, NextFunction } from 'express';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  const keyExists = !body.email || !body.password;
  if (keyExists) return res.status(400).json({ message: 'All fields must be filled' });

  const keyIsFilled = body.email.length < 3 || body.password.length < 6;
  if (keyIsFilled) return res.status(400).json({ message: 'All fields must be filled' });

  next();
}
