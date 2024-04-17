import { getUser } from "../service/auth.js";

export const restrictLoggedInUserOnly = async (req, res, next) => {
  const userSessionId = req.cookies?.uid;
  console.log('mdw 1');
  if (!userSessionId) {
    return res.redirect('/login');
  }

  const user = getUser(userSessionId);
  if (!user) {
    return res.redirect('/login');
  }

  req.user = user;
  next();
};