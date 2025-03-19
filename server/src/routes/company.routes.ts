import express, { Request, Response } from "express";
import { company } from "../db/models";
export const companyRouter = express.Router();

companyRouter.get("/", async (req: Request, res: Response) => {
  const companies = await company.find().exec();
  res.status(200).json(companies);
});
