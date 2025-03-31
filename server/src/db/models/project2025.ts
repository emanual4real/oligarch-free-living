import mongoose from "mongoose";
import { project2025Schema } from "../schemas";

export const Project2025 = mongoose.model("Project2025", project2025Schema);
