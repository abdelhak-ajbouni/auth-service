import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error: any = {};
    errors.array().map((err) => (error[err.param] = err.msg));
    return res.status(422).json({ success: false, error });
  }

  next();
};
