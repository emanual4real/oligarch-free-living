import express, { Request, Response } from "express";
import { authenticated } from "../auth";
import { IOligarch, Oligarch } from "../db/models";
export const oligarchRouter = express.Router();

oligarchRouter.get("/", async (req: Request, res: Response) => {
  const oligarchs = await Oligarch.find().populate("companies").exec();
  res.status(200).json(oligarchs);
});

oligarchRouter.post(
  "/",
  authenticated,
  async (
    req: Request<object, { oligarch: IOligarch }, object>,
    res: Response
  ) => {
    const body = req.body;

    console.log("body", body);
    try {
      const oligarch = await Oligarch.create(body);
      res.status(201).json(oligarch);
    } catch (err) {
      console.error(err);
      res.status(400).send("Oligarch already exists");
    }
  }
);
