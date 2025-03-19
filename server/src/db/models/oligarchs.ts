import mongoose from "mongoose";
import { oligarchSchema } from "../schemas";

export const Oligarch = mongoose.model("Oligarch", oligarchSchema);
