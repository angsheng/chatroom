var express= require('express');
var SocketServer= require('ws');
var PORT= process.env.PORT||8000

var server= express().use(express.static('www')
).listen(PORT,function(){console.log('listening..')} );

var ws= new SocketServer.Server({server});

ws.on('connection',function(w){
	console.log('connection...')

	w.on('open',function(){
	console.log('open...');
	});

	w.on('message',function(data){
	console.log('message...'+data);
	ws.clients.forEach(function(client){
		client.send(data)
	})
	});

	w.on('close',function(){
	console.log('close...')
	});

});

