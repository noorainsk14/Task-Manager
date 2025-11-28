export const accessCookieOptions = () => ({
  httpOnly: true,
  secure: true,          // Render uses HTTPS → must be true
  sameSite: "none",      // cross-site cookies REQUIRED
  path: "/",             // needed for clearing cookie too
  maxAge: 1000 * 60 * 60 * 3  // 3 hours
});
