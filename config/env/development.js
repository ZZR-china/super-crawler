export default {
  env: 'development',
  MONGOOSE_DEBUG: true,
  meiziKey: "1995",
  mm131Key: "1996",
  jwtSecret: '0a6b944d-d2db-46fc-a85e-0295c986cd9f',
  db: 'mongodb://127.0.0.1:27017/wormtest',
  port: 3000,
  redis: {
    host: 'localhost',
    port: 6379,
  }
};
