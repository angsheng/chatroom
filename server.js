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
	server.connections.forEach( function(conn){conn.sendText( nm )} )  //这种作为参数的函数声明其能看到哪的变量？回调函数的回调参数其能看到哪的变量？
	//当前调用时候其参数声明在哪就能看到哪，但回调类函数呢？
}

