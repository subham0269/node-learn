import mongoose from "mongoose";

async function connectToMongo(URI) {
  return await mongoose.connect(URI)
}

export default connectToMongo;