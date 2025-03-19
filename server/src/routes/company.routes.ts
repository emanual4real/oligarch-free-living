import express, { Request, Response } from "express";
import { Company } from "../db/models";
export const companyRouter = express.Router();

companyRouter.get("/", async (req: Request, res: Response) => {
  const companies = await Company.find().exec();
  res.status(200).json(companies);
});
