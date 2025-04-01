import express, { Request, Response } from "express";
import { Company, Oligarch, Product, Project2025 } from "../db/models";
export const searchRouter = express.Router();

const searchProducts = async (text: string) => {
  return await Product.find({
    $or: [
      { productName: { $regex: `.*${text}.*`, $options: "i" } },
      { productType: { $regex: `.*${text}.*`, $options: "i" } },
      //   TODO: search alternatives
    ],
  }).exec();
};

const searchCompanies = async (text: string) => {
  return await Company.find({
    $or: [{ companyName: { $regex: `.*${text}.*`, $options: "i" } }],
  })
    .populate("products")
    .exec();
};

const searchOligarchs = async (text: string) => {
  return await Oligarch.find({
    $or: [{ name: { $regex: `.*${text}.*`, $options: "i" } }],
  })
    .populate("companies")
    .exec();
};

const searchProject2025 = async (text: string) => {
  return await Project2025.find({
    $or: [{ name: { $regex: `.*${text}.*`, $options: "i" } }],
  }).exec();
};

searchRouter.get("/", async (req: Request, res: Response) => {
  const {
    query: { text },
  } = req;
  if (typeof text === "string") {
    const allProducts = await searchProducts(text);
    const allCompanies = await searchCompanies(text);
    const allOligarchs = await searchOligarchs(text);
    const allProject2025 = await searchProject2025(text);
    return res
      .status(200)
      .json([
        ...allProducts,
        ...allCompanies,
        ...allOligarchs,
        ...allProject2025,
      ]);
  }

  return res.status(204).json();
});
