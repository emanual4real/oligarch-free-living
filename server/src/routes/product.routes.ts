import express, { Request, Response } from "express";
export const productRouter = express.Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Products root get route" });
});
