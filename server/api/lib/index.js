
import nodemailer from 'nodemailer';
import config from '../../config';
var hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    host: `${config.emailHost}`,
    port: config.emailPort,
    secure: false
  
    // service: 'gmail',
    // auth: {
    //   user: 'phuquy.uit@gmail.com',
    //   pass: 'Ngokylong11@@'
    // }
  });

  transporter.use('compile', hbs({
    viewPath: 'server/templates',
    extName: '.hbs'
  }))

  export default transporter;
