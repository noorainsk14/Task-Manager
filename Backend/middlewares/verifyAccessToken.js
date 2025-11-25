import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {verifyJwt} from "../utils/token.js"

    export const verifyAccessToken = asyncHandler(async ( req, res, next) => {
        try {
            const token = req.cookies?.accessToken;

            if(!token) return next(new ApiError(401, "Not authenticated"));

            const payload = verifyJwt(token);
            req.user = payload //{id, role, username} assigned in login

            next()
        } catch (err) {
            return next(new ApiError(401, "Invalid or expired accesToken"))
        }
    }) 