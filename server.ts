import express from "express";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";
import "./src/configs/dotenvConfig";
import connect from "./src/configs/mongooseConfig";
import { jwtStrategy } from "./src/middlewares/jwtMiddelware";
import { routes } from "./src/routes";

connect(process.env.DB_URL);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

jwtStrategy(passport);
routes(app);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
