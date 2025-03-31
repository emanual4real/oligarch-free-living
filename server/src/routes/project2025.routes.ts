import express, { Request, Response } from "express";
import { Project2025 } from "../db/models";
export const project2025Router = express.Router();

project2025Router.get("/", async (req: Request, res: Response) => {
  const project2025 = await Project2025.find().exec();
  res.status(200).json(project2025);
});
