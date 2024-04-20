import jwt from "jsonwebtoken";
const secret = "adf#afaf$subham";


export const setUser = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  }, secret);
}

export const getUser = (uid) => {
  if (!uid) return null;
  return jwt.verify(uid, secret);
}