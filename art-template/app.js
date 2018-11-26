

  const express = require('express');
  const Router = require('./router/router.js');
  const bodyParser = require('body-parser');
  const path = require('path');
  const app = express();
  // 在服务端使用 cookie session
  // 引入第三方包
  const session = require('express-session');
  // app.engine('html',require('express-art-template'));
  // 开放静态资源
  app.use('/node_modules/',express.static('./node_modules/'));
  app.use('/public/',express.static('./public/'));
  app.use(express.static(path.join(__dirname, 'public')));
  // 配置 body-parser
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // 配置选项
  // 当把这个插件配置好之后，就可以通过 req.session 来发访问和设置 Session 成员
  // 添加 session 数据 req.session.foo = 'bar'
  // 访问 session 数据 req.session.foo
  app.use(session({
      // 加密
      secret:'keyboard cat',
      resave:false,
      // 是否加密
      saveUninitialized:true
  }));
  // 页面跳转路由
  const Routes = require('./routes.js');
  // 在入口文件中使用路由
  app.use(Router);
  app.use(Routes);
  // 拦截器
  app.use((req,res,next)=>{
    let url = req.url;
    if( url = './home' ){
        let name = req.session.Login;
        if( name ){
          next()
        }else{
          return res.redirect('/');
        }
    }else{
        next();
    }
  });


  app.listen(3031,function(){
  	 console.log('服务器启动')
  });