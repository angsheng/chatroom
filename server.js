var ws=require('nodejs-websocket')
var server = ws.createServer(function(conn){
	console.log('new connection.. ');
	conn.on('text',function(str){
		console.log( 'recieved: ' + str );
		conn.sendText( str.toUpperCase() + '!!!')
	});
	conn.on('close',function(code,reason){
		console.log('connetion closed')
	})
}).listen(8080)
