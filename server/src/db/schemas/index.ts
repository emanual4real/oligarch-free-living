import mongoose, { Schema } from "mongoose";

export const productSchema = new mongoose.Schema({
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

export const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: false }],
  isOligarchFree: { type: Schema.Types.Boolean, default: false },
});

export const oligarchSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  oligarchRating: Number,
  description: String,
  sources: [String],
  companies: [{ type: Schema.Types.ObjectId, ref: "Company", required: false }],
});

export const project2025Schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  sources: [String],
});
