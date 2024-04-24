import { getUser } from "../service/auth.js";

export const restrictLoggedInUserOnly = async (req, res, next) => {
  const userSessionId = req.cookies?.uid;
  console.log('mdw restrictLoggedInUserOnly');
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

export const checkAuth = async (req,res,next) => {
  const userSessionId = req.cookies?.uid;
  console.log('mdw checkAuth');

  const user = getUser(userSessionId);

  req.user = user;
  next();
}