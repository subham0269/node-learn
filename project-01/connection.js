import mongoose, { connect } from 'mongoose';


async function connectToDB(URI) {
  return await mongoose.connect(URI)
}

export default connectToDB