import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "3h"

export function generateAccessToken(payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES })
}

export function verifyJwt(token){
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}