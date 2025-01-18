import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ruleImage: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
    default: "",
  },
  profile: {
    type: String,
    default: "",
  },
  permission: {
    type: Boolean,
    required: true,
    default: false,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const model = mongoose.models?.Author || mongoose.model("Author", schema);

export default model;
