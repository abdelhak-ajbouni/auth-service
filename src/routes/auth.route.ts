import { Router, Request, Response } from "express";

import { check } from "express-validator";
import { register, login } from "../controllers/auth";
import { validate } from "../middlewares/validate";

const router = Router();

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 chars long"),
    check("firstName").not().isEmpty().withMessage("First name is required"),
    check("lastName").not().isEmpty().withMessage("Last name is required"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password").not().isEmpty().withMessage("Password can't be empty"),
  ],
  validate,
  login
);

export default router;
