import { ApiError } from "../utils/ApiError.js";
import { verifyJwt } from "../utils/token.js";

export const verifyAccessToken = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next(new ApiError(401, "Not authenticated"));
    }

    const payload = verifyJwt(token);
    req.user = payload; // {id, role, username}

    next();
  } catch (err) {
    next(new ApiError(401, "Invalid or expired accessToken"));
  }
};
