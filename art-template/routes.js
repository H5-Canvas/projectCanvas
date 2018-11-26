

   const express = require('express');
   const routes = express();
   routes.get('/home', (req, res) => {
       res.sendFile(__dirname+'/views/home.html');
   });
   routes.get('/', (req, res) => {
       res.sendFile(__dirname+'/views/index.html');
   });
   routes.get('/login', (req, res) => {
       res.sendFile(__dirname+'/views/login.html');
   });
   routes.get('/myblog', (req, res) => {
       res.sendFile(__dirname+'/views/myblog.html');
   });
   routes.get('/text', (req, res) => {
       res.sendFile(__dirname+'/views/text.html');
   });
   routes.get('/details', (req, res) => {
       res.sendFile(__dirname+'/views/template/article.html');
   });
   routes.get('/share', (req, res) => {
       res.sendFile(__dirname+'/views/share.html');
   });
   routes.get('/sendOn', (req, res) => {
       res.sendFile(__dirname+'/views/template/send.html');
   });



   module.exports = routes;