import mongoose from "mongoose";
import { companySchema } from "../schemas";

export const Company = mongoose.model("Company", companySchema);
