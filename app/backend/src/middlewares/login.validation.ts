import { Request, Response, NextFunction } from 'express';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const keyExists = !req.body.email && !req.body.password;
  const keyIsFilled = req.body.email.length < 3 && req.body.password.length < 6;
  if (keyExists && keyIsFilled) {
    return res
      .status(400)
      .json({ message: 'All fields must be filled' });
  }

  next();
}
