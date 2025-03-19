import mongoose from "mongoose";
import { productSchema } from "../schemas";

export const Product = mongoose.model("Product", productSchema);
