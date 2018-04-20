var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
var messages = [];
var obj = {};

app.use(express.static("."));
app.get('/', function (req, res) {
   res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) {
   for(var i in messages) {
     io.sockets.emit("display message", messages[i]);
   }
   socket.on("send message", function (data) {
       messages.push(data);
	   for(var i in messages) {
		   obj[i] = messages[i];
	   }
	   var json = JSON.stringify(obj);
	   fs.writeFileSync("messages.json", json);
       io.sockets.emit("display message", data);
   })
   socket.on("delete messages", function () {
       messages = [];
	   fs.unlinkSync("messages.json");
       io.sockets.emit("delete tags");
   })

});
