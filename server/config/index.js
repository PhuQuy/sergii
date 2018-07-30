const config = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://phuquy:XXxx11!!@phuquyitachi-shard-00-00-sj4th.mongodb.net:27017,phuquyitachi-shard-00-01-sj4th.mongodb.net:27017,phuquyitachi-shard-00-02-sj4th.mongodb.net:27017/test?ssl=true&replicaSet=phuquyitachi-shard-0&authSource=admin&retryWrites=true',
  emailSerive: process.env.EMAIL_SERVICE || 'gmail',
  emailAuth: {
      username: process.env.EMAIL_AUTH_USERNAME || 'phuquy.uit@gmail.com',
      password: process.env.EMAIL_AUTH_PASSWORD || 'Ngokylong11@@'
  },
  emailSendFrom: process.env.EMAIL_SEND_FROM || 'phuquy.uit@gmail.com'
};

export default config;
