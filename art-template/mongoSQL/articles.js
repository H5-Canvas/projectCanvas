

  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  mongoose.Promise = global.Promise;

  // 连接数据库
  mongoose.connect('mongodb://localhost/test');

  const ArticleKind = new Schema({
      name:{
        type:String
      },
      id:{
        type:String
      },
      textArr:{
        type:Array
      }
  });

  module.exports = mongoose.model('articles',ArticleKind);

