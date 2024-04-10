import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true
  },
  lastName:{
    type:String,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: String,
  }
}, {timestamps: true});

const UserModel = new mongoose.model("user", userSchema);
export default UserModel;