import { Schema, model } from "mongoose";

const UserDataSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    email: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    activityFamily: { type: String, required: true },
    options: { type: [String], required: true },
    price: { type: String, required: true },
  },
  { timestamps: true, autoCreate: true },
);

export const UserData = model("userData", UserDataSchema);
