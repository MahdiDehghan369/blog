module.exports = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({
          message: "Access denied. You do not have the required permissions.",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
