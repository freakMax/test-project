const {Schema, model} = require('mongoose');

const Post = new Schema({
  name: {type: String, unique: true, required: true},
  description: {type: String, required: true},
  services: {type: Array, required: true},
  photo: {type: String},
});

module.exports = model('Post', Post);
