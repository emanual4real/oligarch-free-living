import express, { Request, Response } from "express";
import { Product } from "../db/models";
export const productRouter = express.Router();

productRouter.get("/", async (req: Request, res: Response) => {
  const allProducts = await Product.find({}).populate("company").exec();
  res.status(200).json(allProducts);
});
