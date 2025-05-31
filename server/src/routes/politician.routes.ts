import express, { Request, Response } from "express";
import { Politician } from "../db/models/politicians";
export const politicianRouter = express.Router();

politicianRouter.get("/", async (req: Request, res: Response) => {
  const politicians = await Politician.find().exec();
  res.status(200).json(politicians);
});
