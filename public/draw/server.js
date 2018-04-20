var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var imageSource;

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) {
   io.sockets.emit("display image", imageSource);
   socket.on("send image", function (data) {
	   imageSource = data;
       io.sockets.emit("display image", data);
   })
   socket.on("delete image", function() {
       imageSource = '';
       io.sockets.emit("display image", imageSource);
       io.sockets.emit("delete images user-side");
   })
});
