const jwt = require("jsonwebtoken");
const configs = require("../configs");

module.exports = (req, res, next) => {
  try {
    const accessToken = req.cookies["accessToken"];

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Authentication required. Please log in." });
    }

    const decoded = jwt.verify(accessToken, configs.auth.accessTokenSecretKey);

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};
