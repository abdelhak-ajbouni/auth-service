import { Application, Request, Response } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import authRoute from "../routes/auth.route";
import usersRoute from "../routes/users.route";

export const routes = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send({
      message: "No response.",
    });
  });
  app.use("/api/auth", authRoute);
  app.use(
    "/api/users",
    (req, res, next) => authenticate(req, res, next, "ADMIN"),
    usersRoute
  );
};
