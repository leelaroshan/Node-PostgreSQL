
require('dotenv').config()
const express = require('express');
const users = require('./api/users');
const orders = require('./api/orders');

const server = express();

const PORT = 5000;


server.use(express.json());

server.get('/',(req,res)=> res.send('welcome to node with postgre'))

server.use('/users', users);
server.use('/orders',orders);





server.listen(PORT,()=> console.log(`server listening on port ${PORT}`))