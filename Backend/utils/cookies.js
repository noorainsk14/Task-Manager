export const accessCookieOptions = () => {
    const isProd = process.env.NODE_ENV === "production";

    const maxAge = 1000 * 60 * 60 * 3; //1 hours in ms (matches access token)

    return{
        httpOnly:true,
        secure: isProd,
        sameSite: "lax",
        maxAge
    }
}