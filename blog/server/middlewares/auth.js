import { validateToken } from "../services/auth.js";

export default function checkForAuthCookies (cookie) {
  return (req,res,next) => {
    const cookieValue = req.cookies[cookie];
    if (!cookieValue) next();
    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
    } catch (err) {
      console.log("Error in Authentication Cookie");
    }
    next();
  }
}