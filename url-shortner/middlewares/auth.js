import { getUser } from "../service/auth.js";

export const restrictLoggedInUserOnly = (req,res, next) => {
  const userSessionId = req.cookie?.uid;

  const userExists = getUser(userSessionId);
  if (!userExists || !userSessionId) return res.redirect('/login')
  req.user = user;
  next();
}