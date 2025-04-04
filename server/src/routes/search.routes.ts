import express, { Request, Response } from "express";
import { mongo } from "mongoose";
import {
  Company,
  ICompany,
  IProduct,
  Oligarch,
  Product,
  Project2025,
} from "../db/models";
import { distinctModelList } from "../utils";
export const searchRouter = express.Router();

const findOligarchsWithCompanies = async (companyIds: string[]) => {
  return await Oligarch.find({
    companies: { $in: companyIds },
  }).exec();
};

/**
 *
 * @param text Search for products by text, then cascade through company and oligarch relationships
 * @returns
 */
const searchProducts = async (text: string) => {
  const products = await Product.find({
    $or: [
      { productName: { $regex: `.*${text}.*`, $options: "i" } },
      { productType: { $regex: `.*${text}.*`, $options: "i" } },
      //   TODO: search alternatives
    ],
  })
    .populate("company")
    .exec();
  const companies = products
    .filter((row) => row.company)
    .map((row) => row.company)
    .flat() as ICompany[];
  const companyIds = companies.map((row) => row._id.toString());
  const oligarchs = await findOligarchsWithCompanies(companyIds);

  return [...products, ...companies, ...oligarchs];
};

/**
 *
 * @param text Search for companies by text, then cascade through product and oligarch relationships
 * @returns
 */
const searchCompanies = async (text: string) => {
  const companies = await Company.find({
    $or: [{ companyName: { $regex: `.*${text}.*`, $options: "i" } }],
  })
    .populate("products")
    .exec();
  const products = companies.map((row) => row.products).flat() as IProduct[];

  const companyIds = companies.map((row) => row._id.toString());
  const oligarchs = await findOligarchsWithCompanies(companyIds);

  return [...products, ...companies, ...oligarchs];
};

/**
 * Search for oligarchs by text, then cascade through companies and product relationships
 * @param text
 * @returns
 */
const searchOligarchs = async (text: string) => {
  const oligarchs = await Oligarch.find({
    $or: [{ name: { $regex: `.*${text}.*`, $options: "i" } }],
  })
    .populate("companies")
    .exec();
  const companies = oligarchs
    .filter((row) => row.companies)
    .map((row) => row.companies)
    .flat() as ICompany[];
  const productIds = companies
    .map((row) => row.products.map((product) => product.toString()))
    .flat();
  const products = await Product.find({
    _id: productIds,
  }).exec();

  return [...oligarchs, ...companies, ...products];
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

    const allItems = [
      ...allProducts,
      ...allCompanies,
      ...allOligarchs,
      ...allProject2025,
    ] as { _id: mongo.ObjectId }[];

    const uniqueList = distinctModelList(allItems);

    return res.status(200).json(uniqueList);
  }

  return res.status(204).json();
});
