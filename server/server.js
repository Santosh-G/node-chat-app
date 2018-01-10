const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {genereateMessage,genereateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
	console.log("New User connected");

	// socket.emit('newMessage',genereateMessage('Admin','Welcome to chat App'));

	// socket.broadcast.emit('newMessage',genereateMessage('New User','New user is connected'));
	socket.on('createLocationMessage',(coords)=>{
	
			io.emit('newLocationMessage',genereateLocationMessage(coords));
	});

	socket.on('createMessage',(message,callback)=>{
		// console.log("Create Message:",messagecss)
		io.emit('newMessage',genereateMessage(message.from,message.text));
		callback();
		// io.emit('newMessage',{
		// 	from:message.from,
		// 	text:message.text,
		// 	createdAt:new Date().getTime()
		// });

		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect',()=>{
		console.log('User was disconected');
	});
})

server.listen(port,()=>{
	console.log(`Started on port ${port}`);
});
