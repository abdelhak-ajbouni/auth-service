import { Router, Request, Response } from "express";

import { check } from "express-validator";
import { register, login } from "../controllers/auth";
import { validate } from "../middlewares/validate";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "You are in the Auth Endpoint. Register or Login to test Authentication.",
  });
});

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be at least 6 chars long"),
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("You first name is required"),
    check("lastName").not().isEmpty().withMessage("You last name is required"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password").not().isEmpty(),
  ],
  validate,
  login
);

export default router;
