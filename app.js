var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var settings = require('./settings');
var http = require('http');
var debug = require('debug')('WPBack:server');

var app = express();
//设置开发者环境为生产模式  product or development
//app.set('env',"product")
// view engine setup
app.set('port', process.env.PORT || 8800);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
// app.use(session({
//     secret: 'myblog',
//     resave: false, //重新保存：强制会话保存即使是未修改的
//     saveUninitialized: true, //强制“未初始化”的会话保存到存储。
//     store: new MongoStore({
//         url:'mongodb://'+settings.host+":"+settings.port+'/'+settings.db,
//         ttl: 20 * 60
//     })
// }));
//设置我们自己的路由
routes(app);
//创建server
var server = http.createServer(app);
//启动server 监听
server.listen(app.get("port"));
server.on('error', onError);
server.on('listening', onListening);


//app.use 加载用于处理http請求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理
//app.use顺序执行

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log("云归后台服务器监听："+bind)
}

//module.exports = app;
