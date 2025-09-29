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

    try {
      const oligarch = await Oligarch.create(body);
      const populatedOligarch = await Oligarch.find({ _id: oligarch._id })
        .populate("companies")
        .exec();
      res.status(201).json(populatedOligarch);
    } catch (err) {
      console.error(err);
      res.status(400).send("Oligarch already exists");
    }
  }
);

oligarchRouter.patch(
  "/:id",
  authenticated,
  async (
    req: Request<{ id: string }, { oligarch: IOligarch }, object>,
    res: Response
  ) => {
    const body = req.body;
    const { id } = req.params;

    try {
      const updatedOligarch = await Oligarch.findByIdAndUpdate(id, body);

      if (updatedOligarch) {
        const populatedOligarch = await Oligarch.findById(updatedOligarch._id)
          .populate("companies")
          .exec();
        res.status(200).json(populatedOligarch);
      } else {
        res.status(400).send("Unable to update Oligarch");
      }
    } catch (err) {
      console.error(err);
      res.status(400).send("Oligarch already exists");
    }
  }
);
