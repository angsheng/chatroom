var express= require('express');
var SocketServer= require('ws');
var PORT= process.env.PORT||8000

var server= express().use(express.static('www')
).listen(PORT,function(){console.log('listening on '+PORT)} );

var ws= new SocketServer.Server({server});



ws.on('connection',function(w){
	console.log('connection...')
	online++;

	var sysData={
		'pic':'',
		'content':'',
		'infor':''
	}

	w.on('open',function(){
		console.log('open...');
	});

	w.on('message',function(data){
		console.log('message...'+data);

//	var msg= online+'*'+data

	

		ws.clients.forEach(function(client){
	//		client.send( msg  )
			client.send(data)
		})
	});

	w.on('close',function(){
		console.log('close...')
		online--;
		clearInterval(intervalSend);
	});
try{
	sysData.content='welcome join the chat !'
	sysData.infor='online: '+online ;
	w.send( JSON.stringify(sysData) ) ;   //send only supose STRING type
	sysData.content=''; 
	var intervalSend= setInterval(function(){ sysData.infor='online:'+online; w.send(JSON.stringify(sysData)) },5000)
	}catch(e){
		console.log( 'interval send error,need clear it')
	}
});

var online=0;