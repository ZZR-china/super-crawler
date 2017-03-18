export default {
  env: process.env.NODE_ENV,
  jwtSecret: process.env.jwtSecret,
  db: process.env.mongodb,
  meiziKey: process.env.MEIZI_KEY,
  port: process.env.APP_PORT || 3000,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  whitelist: [
      'https://www.github.io'
  ]
};
