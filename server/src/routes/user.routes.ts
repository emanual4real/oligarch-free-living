import express, { Request, Response } from "express";
import { IUser, User } from "../db/models";
export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const users = await User.find().exec();
  res.status(200).json(users);
});

userRouter.get(
  "/:id",
  async (
    req: Request<{ id: string }, { user: IUser }, object>,
    res: Response
  ) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id }).exec();
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(404);
    }
  }
);

userRouter.post(
  "/",
  async (
    req: Request<
      object,
      { user: IUser },
      { emailAddress: string; password: string }
    >,
    res: Response
  ) => {
    const { emailAddress, password } = req.body;
    try {
      const users = await User.create({
        emailAddress,
        password,
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(409).json("Unable to create user");
    }
  }
);

userRouter.delete(
  "/:id",
  async (req: Request<{ id: string }, object, object>, res: Response) => {
    const { id } = req.params;
    try {
      await User.findOneAndDelete({ _id: id }).exec();
      res.status(204).json();
    } catch (err) {
      console.error(err);
      res.status(404).json("Unable to delete user");
    }
  }
);

userRouter.patch(
  "/:id",
  async (
    req: Request<
      { id: string },
      { user: IUser },
      { emailAddress: string; password: string }
    >,
    res: Response
  ) => {
    const { id } = req.params;
    const { emailAddress, password } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { emailAddress, password },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(404).json("Unable to update user");
    }
  }
);
