import express, { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { comparePassword } from "../auth";
import { config } from "../config";
import { User } from "../db/models";

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { emailAddress, password } = req.body;
  const user = await User.findOne({ emailAddress: emailAddress }).exec();

  if (!user) {
    return res.status(403);
  }
  const passwordMatch = await comparePassword(password, user.password[0]);

  if (passwordMatch) {
    try {
      const token = jwt.sign(
        {
          data: {
            userId: user._id,
            emailAddress,
          },
        },
        config.authSecret,
        { expiresIn: config.authExp as never }
      );

      return res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      return res.status(403);
    }
  }

  return res.status(403);
});
