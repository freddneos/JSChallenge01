const express = require('express');
const server = express();

server.use(express.json());



server.get('/hello' , (req,res) => {
	console.log('hello world');
	res.json({message:'hello world'});
})
server.listen(3000);
