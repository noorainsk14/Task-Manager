import { ApiError } from "../utils/ApiError.js";

export const authorizeRoles = (...allowed) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Not authenticated"));
  }

  if (!allowed.includes(req.user.role)) {
    return next(new ApiError(403, "Forbidden"));
  }

  next();
};
