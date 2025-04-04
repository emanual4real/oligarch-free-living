import mongoose, { Model, Schema } from "mongoose";
import { ICompany } from "./companies";

export interface IOligarch {
  _id: string;
  type: "oligarch";
  name: string;
  oligarchRating: number;
  description: string;
  sources: string[];
  companies: (string | ICompany)[];
}

export type OligarchModel = Model<IOligarch>;

export const oligarchSchema = new mongoose.Schema<IOligarch, OligarchModel>({
  type: { type: Schema.Types.String, default: "oligarch" },
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

export const Oligarch = mongoose.model<IOligarch, OligarchModel>(
  "Oligarch",
  oligarchSchema
);
