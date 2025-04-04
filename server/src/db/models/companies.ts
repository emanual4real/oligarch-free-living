import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "./products";

export interface ICompany {
  _id: string;
  type: "company";
  companyName: string;
  products: (string | IProduct)[];
  isOligarchFree: boolean;
}

export type CompanyModel = Model<ICompany>;

export const companySchema = new mongoose.Schema<ICompany, CompanyModel>({
  type: { type: Schema.Types.String, default: "company" },
  companyName: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: false }],
  isOligarchFree: { type: Schema.Types.Boolean, default: false },
});

export const Company = mongoose.model<ICompany, CompanyModel>(
  "Company",
  companySchema
);
