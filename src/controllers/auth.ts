import { Request, Response } from "express";
import User from "../models/user";

// @route POST api/auth/register
// @desc Register user
// @access Public
export const register = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res.status(401).json({
          success: false,
          message:
            "This email address is already associated with another account.",
        });

      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      newUser
        .save()
        .then((user) =>
          res.status(200).json({
            success: true,
            message: "User added successfully",
            data: {
              id: user._id,
              email: user.email,
              isEmailVerified: user.isEmailVerified,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            },
          })
        )
        .catch((err) =>
          res.status(500).json({ success: false, message: err.message })
        );
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
export const login = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          success: false,
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account.",
        });

      if (!user.comparePassword(req.body.password))
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: user.generateJWT(),
        data: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
      });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message, error: err })
    );
};

// @route POST api/auth/logout
// @desc Logout user
// @access Public
export const logout = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/");
  }
};
