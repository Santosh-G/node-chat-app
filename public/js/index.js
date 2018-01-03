var socket = io();
	socket.on('connect',()=>{
		console.log("Connected to Server");

		socket.emit('createMessage',{
			from:'Santosh',
			text:'Yup that works me',
		});


	});

	socket.on('disconnect',()=>{
		console.log('Disconnected from Server');
	});

	socket.on('newMessage',function(message){
		console.log('New Message',message);
	});

	socket.on('newEmail', function(email){
		console.log('New Email',email);
	});

	