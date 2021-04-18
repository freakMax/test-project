const {Schema, model} = require('mongoose');

const Order = new Schema({
  username: {type: String, required: true},
  date: {type: String, required: true},
  services: {type: Array, required: true},
  status: {type: String, default: 'In process'},
});

module.exports = model('Order', Order);
