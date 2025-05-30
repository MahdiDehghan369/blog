const errorHandler = (err, req, res, next) => {

  const statusCode = err.status || 500;

  const message = err.message;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
}

module.exports = errorHandler;
