export default {
  env: process.env.NODE_ENV,
  jwtSecret: process.env.jwtSecret,
  db: process.env.mongodb,
  meiziKey: process.env.MEIZI_KEY,
  port: process.env.APP_PORT || 3000,
  whitelist: [
      'https://www.github.io'
  ]
};
