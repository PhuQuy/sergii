const config = {
  port: process.env.PORT || 8080,
  db: process.env.MONGODB_URI || 'mongodb://phuquy:XXxx11!!@phuquyitachi-shard-00-00-sj4th.mongodb.net:27017,phuquyitachi-shard-00-01-sj4th.mongodb.net:27017,phuquyitachi-shard-00-02-sj4th.mongodb.net:27017/test?ssl=true&replicaSet=phuquyitachi-shard-0&authSource=admin&retryWrites=true',
  emailSerive: process.env.EMAIL_SERVICE || 'gmail',
  emailHost: process.env.EMAIL_HOST || 'localhost',
  emailPort: process.env.EMAIL_PORT || 25,
  emailSecure: process.env.EMAIL_SECURE || false,
  emailSendFrom: process.env.EMAIL_SEND_FROM || 'app@femito.com',
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD
};

export default config;
