import jwt from "jsonwebtoken";
const secret = "127f8b1a9d408a403be60e68b398e845cb2a910f1fab5fc3d9e716c83a46c59ed063172497784cd81302e1157903eebeaf6b23cf3753005940ef5d975290cc36565a9c58fcb38252367f54db809603aa31b03b7d0d528da99bbd2d859c5f4e84d9ef4a9ce03701755221c105bab1e628ef5290b2bb90937d7f09e15d0f50f3af04";


export const setUser = (user) => {
  return jwt.sign({
    _id: user._id,
    fullName:user.fullName,
    email: user.email
  }, secret);
}

export const getUser = (uid) => {
  if (!uid) return null;
  return jwt.verify(uid, secret);
}