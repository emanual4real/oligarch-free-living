import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { oligarchSchema } from "../db/schemas";
export const oligarchRouter = express.Router();

oligarchRouter.get("/", async (req: Request, res: Response) => {
  const oligarch = mongoose.model("Oligarch", oligarchSchema);

  const oligarchs = await oligarch.find().exec();
  res.status(200).json(oligarchs);
});

oligarchRouter.post("/", (req: Request, res: Response) => {
  res.json({ message: "Oligarch saved" });
});
