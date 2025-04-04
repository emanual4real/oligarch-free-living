import mongoose, { Model, Schema } from "mongoose";
import { ICompany } from "./companies";

export interface IProduct {
  _id: string;
  type: "product";
  productName: string;
  productType: string;
  company: (string | ICompany)[];
  alternatives: string[];
  isOligarchFree: boolean;
  sources: string[];
}

export type ProductModel = Model<IProduct>;

export const productSchema = new mongoose.Schema<IProduct, ProductModel>({
  type: { type: Schema.Types.String, default: "product" },
  productName: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  productType: String,
  company: { type: Schema.Types.ObjectId, ref: "Company", required: false },
  alternatives: [String],
  isOligarchFree: { type: Schema.Types.Boolean, default: false },
  sources: [String],
});

export const Product = mongoose.model<IProduct, ProductModel>(
  "Product",
  productSchema
);
