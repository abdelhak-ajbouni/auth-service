import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
  role: String = "SIMPLE_USER"
) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) return next(err);

    if (!user || user.role !== role)
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });

    req.user = user;

    next();
  })(req, res, next);
};
