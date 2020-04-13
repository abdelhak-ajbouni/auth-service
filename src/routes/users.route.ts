import { Router, Request, Response, NextFunction } from "express";
import user from "../models/user";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newUser = new user({
    email: req.body.email,
  });

  const savedUser = await newUser
    .save()
    .catch((error) => res.status(400).json({ error: error }));
  res.status(200).send(savedUser);
});

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await user
    .find()
    .catch((error) => res.status(500).json({ error: error }));

  res.status(200).send(allUsers);
});

export default router;
