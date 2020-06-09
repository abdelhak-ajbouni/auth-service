import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized Access - No Token Provided!",
        });

    req.user = user;

    next();
  })(req, res, next);
};
