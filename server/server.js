const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on('connection',(socket)=>{
	console.log("New User connected");

	socket.emit('newEmail',{
		from:'santosh kumar',
		text:'Hey what is going on.',
		createAt:123
	});

	socket.on('createEmail',(newEmail)=>{
		console.log('createEmail',newEmail);
	});

	socket.on('createMessage',(message)=>{
		console.log("Create Message:",message)
	});
	socket.emit('newMessage',{
		from:'santosh',
		text:'Hey buddy whts up'
	});

	socket.on('disconnect',()=>{
		console.log('User was disconected');
	});
})

server.listen(port,()=>{
	console.log(`Started on port ${port}`);
});

