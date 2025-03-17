import express, { Request, Response } from "express";
export const companyRouter = express.Router();

companyRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Companies root get route" });
});
