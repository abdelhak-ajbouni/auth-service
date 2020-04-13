import express, { Request, Response, NextFunction } from "express";
import "./config/dotenvConfig";
import connect from "./config/mongooseConfig";

import usersRoute from "./src/routes/users.route";

connect(process.env.DB_URL);

const app = express();
app.use(express.json());
app.use("/users", usersRoute);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
