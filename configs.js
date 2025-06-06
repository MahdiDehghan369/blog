module.exports = {
  port: process.env.PORT || 3069,
  db: {
    DATABASE_URI: process.env.DATABASE_URI,
    poolSize: process.env.DB_POOL_SIZE || 10,
  },
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    refreshTokenExpiresInSeonds: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
    accessTokenExpiresInSeonds: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  },
  nodemailer: {
    userEmail: process.env.USER_NAME_EMAIL,
    passEmail: process.env.PASSWORD_EMAIL,
  },
  resetPassword: {
    resetPassowrdTokenSecretKey: process.env.RESET_PASSWORD_TOKEN_SECRET_KEY,
    resetPassowrdExpiresInSeconds: process.env.RESET_PASSWORD_EXPIRES_IN_SECONDS,
  },
};