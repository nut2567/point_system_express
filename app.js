var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

const rewardsRouter = require('./routes/rewards');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// ใช้ CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // อนุญาตให้โดเมนนี้เข้าถึง
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // วิธีที่อนุญาต
  credentials: true // ถ้าคุณต้องการส่ง cookies หรือ HTTP Auth
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/rewards', rewardsRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
