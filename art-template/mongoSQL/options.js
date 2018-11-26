

  // 下拉列表数据
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  mongoose.Promise = global.Promise;
  // 连接数据库
  mongoose.connect('mongodb://localhost/test');

  const option = new Schema({});

  module.exports = mongoose.model('users',option);

