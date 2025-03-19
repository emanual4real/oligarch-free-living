import express, { Request, Response } from "express";
export const productRouter = express.Router();

productRouter.get("/", async (req: Request, res: Response) => {
  // const allProducts = await product.find({}).exec();
  // res.status(200).json(allProducts);
});
