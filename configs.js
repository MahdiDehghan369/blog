module.exports = {
  port: process.env.PORT || 3069,
  db: {
    DATABASE_URI: process.env.DATABASE_URI,
    poolSize: process.env.DB_POOL_SIZE || 10
  },
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    refreshTokenExpiresInSeonds: process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
    accessTokenExpiresInSeonds: process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  },
};