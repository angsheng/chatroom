var ws=require('nodejs-websocket')

var server = ws.createServer(
	function(conn){
		console.log('new connection');

		conn.on('text',function(str){ 

			broadcast( conn,str )
		});

		conn.on('close',function(){ console.log('closed this connection ') });

		conn.on('error',function(){ console.log('Error'); conn.close() })
	}
).listen(8080)


function broadcast(conn , nm){
	server.connections.forEach( function(conn){conn.sendText( nm )} )  
}

