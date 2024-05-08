import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;


export const validateToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
}

export const setUser = (user) => {
  return jwt.sign({
    _id: user._id,
    fullName:user.fullName,
    email: user.email
  }, JWT_SECRET);
}

export const getUser = (uid) => {
  if (!uid) return null;
  return jwt.verify(uid, JWT_SECRET);
}