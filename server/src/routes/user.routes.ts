import express, { Request, Response } from "express";
import { hashPassword } from "../auth";
import { IUser, User } from "../db/models";
export const userRouter = express.Router();

type RedactedUser = Omit<IUser, "password">;

const removePassword = (user: IUser) => {
  const newUser: RedactedUser = {
    _id: user._id,
    emailAddress: user.emailAddress,
    type: user.type,
  };

  return newUser;
};

userRouter.get("/", async (req: Request, res: Response) => {
  const users = await User.find().exec();
  res.status(200).json(users.map((row) => removePassword(row)));
});

userRouter.get(
  "/:id",
  async (
    req: Request<{ id: string }, { user: RedactedUser }, object>,
    res: Response
  ) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id }).exec();
      res.status(200).json(removePassword(user as IUser));
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
      { user: RedactedUser },
      { emailAddress: string; password: string }
    >,
    res: Response
  ) => {
    const { emailAddress, password } = req.body;
    try {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        emailAddress,
        password: hashedPassword,
      });
      res.status(200).json(removePassword(user));
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
      { user: RedactedUser },
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
      res.status(200).json(removePassword(user as IUser));
    } catch (err) {
      console.error(err);
      res.status(404).json("Unable to update user");
    }
  }
);
