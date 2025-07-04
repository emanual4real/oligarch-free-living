import mongoose, { Model, Schema } from "mongoose";

export interface IPolitician {
  _id: string;
  type: "politician";
  name: string;
  party: string;
  state: string;
  district: string;
  description: string;
  sources: string[];
}

export type PoliticianModel = Model<IPolitician>;

export const politicianSchema = new mongoose.Schema<
  IPolitician,
  PoliticianModel
>({
  type: { type: Schema.Types.String, default: "politician" },
  name: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  party: String,
  state: String,
  district: String,
  description: String,
  sources: [String],
});

export const Politician = mongoose.model<IPolitician, PoliticianModel>(
  "Politician",
  politicianSchema
);
