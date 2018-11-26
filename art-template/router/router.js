

   const express = require('express');
   const router = express.Router();
   // 密码加密第三方插件
   const md5 = require('blueimp-md5');

   // 连接数据库
   // 用户数据
   const User = require('./../mongoSQL/mongodb.js');
   // 列表数据
   const Option = require('./../mongoSQL/options.js');
   // 文章列表数据
   const articles = require('./../mongoSQL/articles.js');
   // 技术文章列表
   const share = require('./../mongoSQL/share.js');

   // 允许跨域
   router.all('*',function (req,res,next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
       next();
   });
   // 解析表单 post 请求的插件  注册接口
   router.post('/reg',function(req,res){
       // 查询是否有注册
       User.findOne({
           $or:[
               {
                   email:req.body.email
               },
               {
                   name:req.body.name
               }
           ]
       },function(err,data){
           if( err ){
               return res.status(500).json({
                   success:false,
                   code:0,
                   message:'server is warning'
               })
           }
           if( data ){
               // 邮箱或用户名已注册
               return res.status(200).json({
                   success:true,
                   code:1,
                   message:'email or name is already use'
               })
           }
           // 注册成功
           // 对密码进行重复加密
           req.body.password = md5(md5(req.body.password));
          new User(req.body).save(function(err,result){
              if(err){
                  return res.status(500).json({
                      success:false,
                      code:0,
                      message:'server is warning'
                  })
              }
              req.session.Login = req.body;
              res.status(200).json({
                  success:true,
                  code:2,
                  message:'use success'
              })
          })
       })
   });

   // 登录接口
   router.post('/login',function(req,res){
      User.findOne({
          email:req.body.email
      },function(err,result){
          if( err ){
              return res.status(500).json({
                  success:false,
                  code:0,
                  message:'server is err'
              })
          }
          if(result){
              // 说明已有账号
              if( result.password === md5(md5(req.body.password)) ){
                  // 说明密码正确
                  req.session.Login = result;
                  return res.status(200).json({
                      code:2,
                      success:true,
                      message:'login is success'
                  })
              }else{
                  // 说明密码错误
                  return res.status(200).json({
                      code:1,
                      success:true,
                      message:'password is err'
                  })
              }
          }else{
              res.status(200).json({
                  success:true,
                  code:1,
                  message:'email is err'
              })
          }
      })
   });

   // 获取列表数据
   router.get('/list',function(req,res){
      User.find(function(err,result){
          if(err){
              return res.status(500).json({
                  success:false,
                  code:0,
                  message:'server is err'
              })
          }
          return res.status(200).json({
              data:JSON.parse(JSON.stringify(result)),
              code:2,
              success:true,
              message:'data is true'
          })
      })
   });

   // 退出登录
   router.get('/Logoff',function(req,res){
       req.session.Login = null;
       res.redirect('/login')
   });

   // 查询用户信息
   router.post('/patient',(req,res)=>{
       User.findOne({
           email:req.body.email
       },(err,data)=>{
           if(err){
               return res.status(500).json({
                   success:false,
                   message:"server is err",
                   code:0
               })
           }
           res.status(200).json({
               success:true,
               message:"data is true",
               data:data
           })
       })
   });

   // 查询列表数据
   router.post('/selectList',function(req,res){
       // 数据库查询
       Option.find({
           id:req.body.id
       },function(err,data){
           if(err){
               return res.status(500).json({
                   code:0,
                   success:false,
                   message:'server is err'
               })
           }
           res.status(200).json({
               code:2,
               success:true,
               data:data,
               message:'data is true'
           })
       })
   });

   // 保存用户数据
   router.post('/update',(req,res)=>{
      User.find({
          email:req.body.email
      },(err,data)=>{
          if(err){
              return res.status(500).json({
                  success:false,
                  code:0,
                  message:'server is err'
              })
          }
          if(data){
              User.update({
                  gender:req.body.gender,
                  birthday:req.body.birthday,
                  name:req.body.name,
                  realname:req.body.realname,
                  address:req.body.address,
                  age:req.body.age,
                  // 技术岗位
                  quarters:req.body.quarters,
                  // 技术方向
                  direction:req.body.direction,
                  // 所属公司
                  company:req.body.company
              },(err,result)=>{
                  if(err){
                      return res.status(200).json({
                          success:true,
                          code:1,
                          message:'user is notfind'
                      })
                  }
                  if(result){
                      res.status(200).json({
                          success:true,
                          code:2,
                          message:'result is true'
                      })
                  }
              })
          }
      })
   });

   // 获取文章列表信息
   router.post('/article',(req,res)=>{
       if(req.body.id === ""){
           // 当获取的 id 值为空时，输出所有数据
           articles.find((err,data)=>{
               if(err){
                   return res.status(500).json({
                       code:0,
                       message:"server is err",
                       success:false
                   })
               }
               if(data){
                   if( req.body.name === ''){
                       return res.status(200).json({
                           code:2,
                           message:"data is true",
                           success:true,
                           data:data
                       })
                   }else{
                       return res.status(200).json({
                           code:2,
                           message:"data is true",
                           success:true,
                           data:result
                       })
                   }
               }
               res.status(200).json({
                   code:2,
                   message:"err",
                   success:true
               })
           })
       }else{
           // 当获取的 id 值
           articles.find({
               id:req.body.id
           },(err,data)=>{
               if(err){
                   return res.status(500).json({
                       code:0,
                       message:"server is err",
                       success:false
                   })
               }
               if(data){
                   if( req.body.name ){
                       let jsonData = data;
                       let id = parseInt(req.body.id) - 1;
                       let json = JSON.parse(JSON.stringify(jsonData[id])).textArr;
                       if( req.body.listId ){
                           for( let a = 0; a < json.length; a++ ){
                               if( req.body.name === json[a].name ){
                                   for( let i = 0; i < json[a].comment.length; i++ ){
                                       if( req.body.listId === json[a].comment[i].id ){
                                           json[a].comment[i].support = parseInt(json[a].comment[i].support) + 1;
                                       }
                                   }
                               }
                           }
                           JSON.parse(JSON.stringify(jsonData[id])).textArr = json;
                           res.status(200).json({
                               code:2,
                               message:"data is true",
                               success:true,
                               data:json
                           })
                       }else{
                           for( let a = 0; a < json.length; a++ ){
                               if( req.body.name === json[a].name ){
                                   res.status(200).json({
                                       code:2,
                                       message:"data is true",
                                       success:true,
                                       data:json[a]
                                   })
                               }
                           }
                       }
                   }else{
                       return res.status(200).json({
                           code:2,
                           message:"data is true",
                           success:true,
                           data:data
                       })
                   }
               }
           })
       }
   });

   router.post('/updateList',(req,res)=>{
       let fr = req.body.name;
       let jsonData = '';
       articles.aggregate(
           [
               {
                   $match:{
                       'id':req.body.id,
                       'textArr.name':req.body.name
                   }
               },
               {
                   $unwind:"$textArr"
               },
               {
                   $match:{
                       'id':req.body.id,
                       'textArr.name':req.body.name
                   }
               },
               {
                   $project:{
                       "textArr.comment":{
                           $slice:[
                               "$textArr.comment",0,4
                           ]
                       }
                   }
               }
           ],
           (err,result)=>{
               if(err){
                   return res.status(500).json({
                       code:0,
                       message:"server is err",
                       success:false
                   })
               }
               if(result){
                   jsonData = JSON.parse(JSON.stringify(result[0])).textArr;
                   res.status(200).json({
                       code:2,
                       message:"data is err",
                       success:true,
                       data:jsonData
                   });
                   articles.updateOne(
                       {
                           "id":req.body.id,
                           "textArr.destination":fr,
                           "textArr.$.comment.id":req.body.listId
                       },
                       {
                           $set:{
                               "textArr.$.comment":jsonData
                           }
                       },
                       (err,data)=>{
                           console.log(data)
                       }
                   )
               }
           }
       );
   });

   // 获取技术文章连接列表
   router.get('/shareList',(req,res)=>{
       share.find((err,data)=>{
           if(err){
              return res.status(500).json({
                  success:false,
                  message:"server is err",
                  code:0
              })
           }
           res.status(200).json({
               success:true,
               message:"data is true",
               code:2,
               data:data
           })
       })
   });

   // 保存文章
   router.post('/saveList',(req,res)=>{
       User.update({
           _id:req.body._id,
       },{
           $push:{
               text:{
                   "author":req.body.author,
                   "creatTime":req.body.time,
                   "destination":req.body.destination,
                   "name":req.body.name,
                   "title":req.body.title,
                   "content":req.body.content,
                   "label":req.body.label
               }
           }
       },(err,data)=>{
           if(err){
               return res.status(500).json({
                   success:false,
                   message:"server is err",
                   code:0
               })
           }
           if(data){
               return res.status(200).json({
                   success:true,
                   message:"data is true",
                   code:2,
                   data:data
               })
           }else{
               return res.status(500).json({
                   success:true,
                   message:"data is err",
                   code:1
               })
           }
       })
   });

   module.exports = router;