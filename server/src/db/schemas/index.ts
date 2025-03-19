import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  productType: String,
  company: String,
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
  products: [productSchema],
});

export const oligarchSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  companies: [String],
  oligarchRating: Number,
  description: String,
  sources: [String],
});
