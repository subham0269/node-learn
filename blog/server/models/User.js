import { Schema } from "mongoose";
import { createHmac, randomBytes } from 'node:crypto';
import mongoose from "mongoose";

const userSchema = new Schema ({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require : true,
    unique: true
  },
  salt : {
    type: String,
  },
  password : {
    type: String,
    required: true
  },
  profileImageUrl : {
    type: String,
    default: '/images/default.jpg'
  },
  role: {
    type: String,
    enum : ["USER", "ADMIN"],
    defaule: "USER"
  }
}, {timestamps: true});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac('sha256', salt).update('password').digest('hex');
  this.salt = salt;
  this.password = hashedPassword;
  next();
})

userSchema.static("passwordMatchChecker", async function (email, password) {
  const user = await this.findOne({email});
  if (!user) {
    throw new Error ('User not found');
  };

  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

  if (hashedPassword !== userProvidedHash) throw new Error ('Incorrect Password');

  return {...user, password : undefined, salt: undefined };
  
})


const userModel = mongoose.model('blog-user', userSchema);

export default userModel;