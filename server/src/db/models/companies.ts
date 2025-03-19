import mongoose from "mongoose";
import { companySchema } from "../schemas";

export const company = mongoose.model("Company", companySchema);
