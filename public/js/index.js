var socket = io();
	socket.on('connect',()=>{
		console.log("Connected to Server");

	});

	socket.on('disconnect',()=>{
		console.log('Disconnected from Server');
	});

	socket.on('newMessage',function(message){

		var li =jQuery('<li></li>');
		li.text(`${message.from}:${message.text}`);
		jQuery('#message-list').append(li);

	});

	socket.on('newLocationMessage',function(message){
		console.log(message);
		var li = jQuery('<li></li>');
		var a  = jQuery('<a target="_blank">My Currect Location:</a>');
		a.attr('href',message.url);
		li.text(`${message.from}: `);
		li.append(a);
		jQuery('#message-list').append(li);

	});



jQuery('#send_location').on('click',function(){
	if(!navigator.geolocation){
		return alert('Geolocation is not supported by your location');
	}
	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage',{
			latitude:position.coords.latitude,
			longitude:position.coords.longitude


		});
	});
});

	socket.on('newEmail', function(email){
		console.log('New Email',email);
	});

	jQuery('#message-form').on('submit',function(e){
			e.preventDefault();
			socket.emit('createMessage',{
				from:'User',
				text: jQuery('#message-text').val()
			},function(){
				jQuery('#message-text').val('');
			});
			// jQuery('#message-text').val('');
	});
