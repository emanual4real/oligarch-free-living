import mongoose, { Model, Schema } from "mongoose";

export interface IProject2025 {
  _id: string;
  type: "project2025";
  name: string;
  phone: string[];
  email: string[];
  address: string[];
  sources: string[];
}

export type Project2025Model = Model<IProject2025>;

export const project2025Schema = new mongoose.Schema<
  IProject2025,
  Project2025Model
>({
  type: { type: Schema.Types.String, default: "project2025" },
  name: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  phone: [String],
  email: [String],
  address: [String],
  sources: [String],
});

export const Project2025 = mongoose.model<IProject2025, Project2025Model>(
  "Project2025",
  project2025Schema
);
