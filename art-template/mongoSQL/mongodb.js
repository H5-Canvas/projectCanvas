   
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;
   mongoose.connect('mongodb://localhost/test');
   // 设置一个全局的 promise
   mongoose.Promise = global.Promise;
   // 设计数据库图表
   const userSchema = new Schema({
       email:{
           type:String,
           require:true
       },
       name:{
           type:String,
           require:true
       },
       password:{
           type:String,
           require:true
       },
       // Data.now 只要创建了数据 自动添加此参数
       created_Time:{
           type:Date,
           default:Date.now
       },
       last_modified_time:{
           type:Date,
           default:Date.now
       },
       avatar:{
           type:String,
           default:'/public/image/logo.png'
       },
       gender:{
           type:Number,
           // 枚举 多个可选的
           enum:[0,1,2],
           default:''
       },
       bio:{
           type:String,
           default:''
       },
       birthday:{
           type:String,
           default:''
       },
       status:{
           type:Number,
           // 0表示没有权限限制 1表示不可以评论 2表示不可以登录使用
           enum:[0,1,2],
           default:0
       },
       realname:{
           type:String
       },
       address:{
           type:String
       },
       age:{
           type:Number
       },
       quarters:{
           type:Number
       },
       direction:{
           type:Number
       },
       company:{
           type:String
       },
       text:[
           {
               title:String,
               Content:String,
               author:String,
               createdTime:String
           }
       ]
   });
   // 创建一个model并输出
   module.exports = mongoose.model('Blog',userSchema);