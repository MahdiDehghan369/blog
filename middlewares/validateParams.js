module.exports = (validator) => {
  return async (req, res, next) => {
    try {
      await validator.validate(req.params);
      next();
    } catch (error) {
      return res.status(400).json({
        error: error.errors,
      });
    }
  };
};
