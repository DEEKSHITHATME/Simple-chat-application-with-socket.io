var socket= io.connect();

function addMessage(msg, user){
	$("#chatentry").append('<p>' + user + ': ' + msg + '</p>');
};

function sendMessage(){

	if($('#messageinput').val()!= ""){
		socket.emit('message',  $('#messageinput').val());
		addMessage($('#messageinput').val(), "Me");
		$('#messageinput').val('');
	}
};

function setuser(){
if($('#userinput').val()!= ""){
	socket.emit('setuser', $('#userinput').val());
	$('#chatcontrol').show();
	$('#userinput').hide();
	$('#userset').hide();

}

};

socket.on('message', function(data){

	addMessage(data['message'], data['user']);
});

$(function(){
$('#chatcontrol').hide();
$('#userset').click(function(){
	setuser();
});
$('#submit').click(function(){
	sendMessage();
});
});