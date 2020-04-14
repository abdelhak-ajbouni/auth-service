import { Router, Request, Response } from "express";
import User from "../models/user";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  const savedUser = await newUser
    .save()
    .catch((error) => res.status(400).json({ error: error }));
  res.status(200).send(savedUser);
});

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await User.find().catch((error) =>
    res.status(500).json({ error: error })
  );

  res.status(200).send(allUsers);
});

export default router;
