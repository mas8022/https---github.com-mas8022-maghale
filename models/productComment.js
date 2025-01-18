import mongoose, { Schema } from "mongoose";
import productModel from "@/models/product";
import userModel from "@/models/user";

const schema = new Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    commenter: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commenterText: {
      type: String,
      required: true,
    },
    publish: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model =
  mongoose.models?.ProductComment || mongoose.model("ProductComment", schema);

export default model;
