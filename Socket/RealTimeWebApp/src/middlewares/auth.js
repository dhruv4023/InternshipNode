import jwt from "jsonwebtoken";
import RESPONSE from "../helpers/response.helper.js";
import config from "../config/config.js";

export const verifyTokenAndRole = (allowedRoles) => (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split("Bearer ")[1];
   
    if (!token) {
      RESPONSE.error(res, "invalid token");
      return;
    }

    const verified = jwt.verify(token, config.jwt_secret);
    req.tokenData = verified;
    
    if (!allowedRoles.includes(verified.role)) {
      RESPONSE.error(res, "unauthorised user");
      return;
    }

    next();
  } catch (error) {
    RESPONSE.error(res, error);
  }
};
