const User = require('./models/User');
const Post = require('./models/Post');
const Order = require('./models/Order');
const jwt = require('jsonwebtoken');
const config = require('./config');

class userController {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async getOneOrder(req, res) {
    try {
      const {id} = req.body;
      const order = await Order.find({_id: id});
      res.json(order);
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async addCleaner(req, res) {
    try {
      const {name, description, services, photo} = req.body;
      await new Post({name, description, services, photo}).save();
      res.json('Ok');
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async updateCleaner(req, res) {
    try {
      const {name, description, services, id} = req.body;
      await Post.updateOne(
        {_id: id},
        {$set: {name: name, description: description, services: services}},
      );
      res.json('Ok');
    } catch (e) {
      console.log(e);
    }
  }
  async deleteCleaner(req, res) {
    try {
      const {id} = req.body;
      await Post.deleteOne({_id: id});
      res.json('Ok');
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }

  async updateStatus(req, res) {
    try {
      const {id, status} = req.body;
      const a = await Order.updateOne({_id: id}, {$set: {status: status}});
      res.json('Ok');
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
  async havePermission(req, res) {
    try {
      const {token} = req.body;
      const id = jwt.verify(token, config.getValue('SECRET_KEY'));
      const user = await User.findOne({_id: id['0']});
      if (user.roles.includes('ADMIN')) {
        res.json(true);
      } else {
        res.json(false);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json('Error');
    }
  }
}

module.exports = new userController();
