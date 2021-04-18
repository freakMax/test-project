const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    post: '587',
    secure: false,
    auth: {
      user: 'robinson2ryan2@gmail.com',
      pass: 'Qwerty123456$',
    },
  },
  {
    from: `Bot <robinson2ryan2@gmail.com>`,
  },
);

module.exports = message => {
  transporter.sendMail(message, (e, info) => {
    if (e) return console.log(e);
  });
};
