import express, { Request, Response } from "express";
import { Oligarch } from "../db/models";
export const oligarchRouter = express.Router();

oligarchRouter.get("/", async (req: Request, res: Response) => {
  const oligarchs = await Oligarch.find().populate("companies").exec();
  res.status(200).json(oligarchs);
});

oligarchRouter.post("/", (req: Request, res: Response) => {
  res.json({ message: "Oligarch saved" });
});
