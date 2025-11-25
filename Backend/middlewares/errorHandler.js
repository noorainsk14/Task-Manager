export default function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.statusCode || err.status || 500;

  return res.status(status).json({
    success: false,
    status,
    message: err.message || "Server Error",
   errors: err.error || err.errors || null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
}
