const Post = require('./models/Post');
const Order = require('./models/Order');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const config = require('./config');

class userController {
  async getCleaners(req, res) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }

  async getOrders(req, res) {
    try {
      const {token} = req.body;
      const id = jwt.verify(token, config.getValue('SECRET_KEY'));
      const user = await User.findOne({_id: id['0']});
      const myOrders = await Order.find({username: user.username}, {});
      res.json(myOrders);
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async addOrder(req, res) {
    try {
      const {token, order} = req.body;
      const date = new Date();
      const id = jwt.verify(token, config.getValue('SECRET_KEY'));
      const user = await User.findOne({_id: id['0']});
      const newOrder = new Order({
        username: user.username,
        date: date,
        services: order,
      });
      newOrder.save();
      res.json('Ok');
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async deleteOrder(req, res) {
    try {
      const {id} = req.body;
      await Order.deleteOne({_id: id});
      res.json('Ok');
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
}

module.exports = new userController();
