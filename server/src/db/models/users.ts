import mongoose, { Model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  type: "user";
  emailAddress: string;
  password: string;
}

export type UserModel = Model<IUser>;

export const userSchema = new mongoose.Schema<IUser, UserModel>({
  type: { type: Schema.Types.String, default: "user" },
  emailAddress: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  password: [{ type: String, require: true }],
});

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
