import mongoose from "mongoose";
import { productSchema } from "../schemas";

export const product = mongoose.model("Product", productSchema);
