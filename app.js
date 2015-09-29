var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http=require('http');




var app = express();
var io= require('socket.io');
var server=http.createServer(app);
io=io.listen(server);
server.listen(2345);
console.log('on 2345');

io.sockets.on('connection', function(socket){
  socket.on('setuser', function(data){
    socket.user=data;
  });
socket.on('message', function(message){
  var data= {'message':message,
'user': socket.user
};
socket.broadcast.emit('message', data);
console.log('user ' + socket.user+ 'sent this :' +message);

});


});
	
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req,res){
  res.render('home.jade');
});

