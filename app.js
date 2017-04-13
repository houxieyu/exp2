var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var quit = require('./routes/quit');
var login = require('./routes/login');
var checklog = require('./routes/checklog');
var recdetail = require('./routes/recdetail');
var getdetail = require('./routes/getdetail');
var device = require('./routes/device');
var getdevs = require('./routes/dev/getDevs');
var saveDev = require('./routes/dev/saveDev');
var updateDev = require('./routes/dev/updateDev');
var removeDev = require('./routes/dev/removeDev');
var users = require('./routes/users');
var createuser = require('./routes/user/create');
var deleteuser = require('./routes/user/delete');
var listuser = require('./routes/user/list');
var setpwd = require('./routes/user/setpwd');
var updateuser = require('./routes/user/update');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'exp2',
    name: 'exp2',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));


app.use('/', login);
app.use('/login', login);
app.use("/lib",express.static( 'node_modules'));
app.use('/public',express.static('public'));
app.use('/checklog', checklog);
app.use('/quit', quit);

app.use(function (req, res, next) {
    if(req.url!='/login' && req.session.user == null) {
        console.log('请先登录');
        res.redirect('/');
        return;
    }
    app.locals.user = req.session.user;
    next();
});

app.use('/index', index);
app.use('/users', users);
app.use('/device', device);
app.use('/recdetail', recdetail);
app.use('/getdetail', getdetail);
app.use('/dev/getdevs', getdevs);
app.use('/dev/saveDev', saveDev);
app.use('/dev/updateDev', updateDev);
app.use('/dev/removeDev', removeDev);

app.use('/user/create', createuser);
app.use('/user/delete', deleteuser);
app.use('/user/list', listuser);
app.use('/user/setpwd', setpwd);
app.use('/user/update', updateuser);

//app.use("/node_modules",express.static( 'node_modules'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
