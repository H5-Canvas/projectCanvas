
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;

   mongoose.connect('mongodb://localhost/test');

   let share = new Schema({});

   module.exports = mongoose.model('Share',share);

