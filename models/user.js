import mongoose from "mongoose";
import productModel from "@/models/product";

const schema = {
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  check: {
    type: Boolean,
    required: true,
    default: false,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  myProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
};

const model = mongoose.models?.User || mongoose.model("User", schema);

export default model;
