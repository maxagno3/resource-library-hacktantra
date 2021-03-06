var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var mongoose = require('mongoose')
require('dotenv').config();
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/v1/users');

//mongoose connect to database
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true },(err => {
  console.log('connected', err?false:true)
}))



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
require('./auth/passport')
// app.use(passport.session());

// app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
