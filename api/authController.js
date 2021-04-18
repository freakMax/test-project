const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');
const mailer = require('./hooks/mailer');

const generateToken = (...info) => {
  const payload = {...info};
  return jwt.sign(payload, config.getValue('SECRET_KEY'), {expiresIn: '24h'});
};

class authController {
  async registration(req, res) {
    const {username, password} = req.body;
    const candidate = await User.findOne({username: username});
    if (candidate) {
      return res.status(400).json('Пользователь с таким именем уже существует');
    } else {
      const hashPassword = bcrypt.hashSync(password, 5);
      await new User({
        username: username,
        password: hashPassword,
        roles: 'USER',
      }).save();

      const user = await User.findOne({username: username});
      const token = generateToken(user._id);
      res.json(token);
    }
  }
  async login(req, res) {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if (!user) {
      return res.status(400).json(`Пользователь ${username} не найден`);
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json('Неверный пароль');
    }
    const token = generateToken(user._id);
    res.json(token);
  }
  async reset(req, res) {
    const {login, mail} = req.body;
    const pass = Math.floor(Math.random() * 10000000);
    const hashPass = bcrypt.hashSync(pass.toString(), 5);
    await User.updateOne({username: login}, {$set: {password: hashPass}});
    const message = {
      to: mail,
      subject: `New password for account ${login}`,
      html: `
      <h2>New password for account ${login}</h2>
      <span>Please, your new password: ${pass}</span>
      `,
    };
    mailer(message);
  }
}

module.exports = new authController();
