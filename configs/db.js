import mongoose from "mongoose";

function connectToDb() {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      mongoose.connect(
        "mongodb://root:FeIuNB0ZpkTPE3P8RZXer9em@manaslu.liara.cloud:31507/my-app?authSource=admin&replicaSet=rs0&directConnection=true"
        // "mongodb://localhost:27017/maghaleh"
      );
    }
  } catch (error) {
    return Response.json({ message: "don`t connect to db" });
  }
}

export default connectToDb;
