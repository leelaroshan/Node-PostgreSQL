

const db = require('../dbinit.js');

const express = require('express');


const api = express.Router();


const getOrders = (req,res)=>{
    db
    .query('SELECT * FROM orders')
    .then(data => res.json(data.rows))
    .catch((err)=> console.log("something went wrong"))

}

const getOrder = (req,res)=>{
    const {id} = req.params
    db
    .query('SELECT * FROM orders WHERE id=$1',[id])
    .then(data => res.json(data.rows))
    .catch((err)=> console.log("something went wrong"))

}


const createOrder = (req,res)=>{
    const {price, user_id} = req.body
    db
    .query('INSERT into orders (price, user_id) values($1, $2)',[price,user_id])
    .then(data => res.status(201).json(data))
    .catch((err)=> console.log("something went wrong"))

}

const updateOrder = (req,res)=>{
    const {id} = req.params;
    const {price, user_id} = req.body
    db
    .query('UPDATE orders SET price=$1, user_id=$2 WHERE id=$3;',
    [
    price,
    user_id,
     id]
    )
    .then(data => res.json(data))
    .catch((err)=> console.log("something went wrong"))

}

const deleteOrder = (req,res)=>{
    const {id} = req.params
    db
    .query('DELETE  FROM orders WHERE id=$1',[id])
    .then(data => res.json(data.rows))
    .catch((err)=> console.log("something went wrong"))

}









api
.route('/')
.get(getOrders)
.post(createOrder)

api
.route('/:id')
.get(getOrder)
.put(updateOrder)
.delete(deleteOrder)


module.exports = api