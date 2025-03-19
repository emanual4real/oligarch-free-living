import mongoose from "mongoose";
import { oligarchSchema } from "../schemas";

export const oligarch = mongoose.model("Oligarch", oligarchSchema);
