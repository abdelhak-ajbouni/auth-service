import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen("3000", () => console.log("server running on port 3000"));
