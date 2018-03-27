var express = require('express')  
var http = require('http')  
var app = express()  
var port = process.env.PORT || 8080
var path = require('path');
var Web3  = require('web3');

var mysql = require('mysql');

var conn = mysql.createConnection({
	host: "localhost",
  	user: "root",
  	password: "",
  	database : 'ethereum',
  	debug    : false 
});

conn.connect(function(err) {
  if (err) throw err;
  	console.log("Connected mysql!");
});

var web3  = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

console.log(web3.eth.accounts);
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8546', {
  origin: 'ws://localhost:8546'
});

ws.on('open', function open() {
  console.log('connected');
  ws.send('{"id": 1, "method": "eth_subscribe", "params": ["newHeads", {"includeTransactions": true}]}');
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function incoming(data){
	if(typeof JSON.parse(data).params !== 'undefined') 
	{
		var eAddress = JSON.parse(data).params.result.hash;
		var bCount = web3.eth.getBlockTransactionCount(eAddress);

		for (i=0; i<bCount; i++) 
		{
			var pResult = web3.eth.getTransactionFromBlock(eAddress, i);
			if(i == bCount-1) 
			{
				console.log(pResult);
				console.log(bCount);
				var query = conn.query("INSERT INTO transactions VALUES (null,'"+pResult.from+"','"+pResult.to+"','"+pResult.value+"','"+pResult.hash+"','"+pResult.gas+"','"+pResult.gasPrice+"','"+pResult.blockNumber+"',CURRENT_TIMESTAMP(),"+bCount+")",function(err,rows){
                    if(err){
                        console.log(err);
                        return next("Mysql error, check your query");
                    }
                });
			}
		}
  	}
});

app.use(express.static(path.join(__dirname, '/public/')))  
var server = http.createServer(app).listen(port, function(){  
	console.log('Express server listening on port ' + port);
});