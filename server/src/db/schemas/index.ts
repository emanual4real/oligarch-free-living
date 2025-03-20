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
