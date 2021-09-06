const express = require('express');

const db = require('../dbinit.js');
const api = express.Router();



const getUsers =(req,res)=> {
    db
    .query('SELECT * FROM users;')
    .then(data => res.json(data.rows))
    .catch((err)=> console.log('something went wrong'))
}

const getUser =(req,res)=> {
    const {id} = req.params;
    db
    .query('SELECT * FROM users WHERE id=$1', [id])
    .then(data => res.json(data.rows[0]))
    .catch((err)=> console.log('something went wrong'))
   
}

const createUser = (req, res) => {
    const { first_name, last_name, age } = req.body;
  
    db
      .query('INSERT INTO users(first_name, last_name, age) values($1, $2, $3) ', [first_name, last_name, age])
      .then(data => res.status(201).json(data))
      .catch((err) => console.log('something went wrong'))
  }

  const deleteUser = (req, res) => {
    const { id } = req.params;
  
    db
      .query('DELETE FROM users WHERE id=$1; ', [id])
      .then(data => res.json(data))
      .catch((err) => console.log('something went wrong'))
  }
  const updateUser = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, age } = req.body;
  
    db
      .query(
        'UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4;', 
        [
          first_name,
          last_name,
          age,
          id
        ]
      )
      .then(data => res.json(data))
      .catch((err) => console.log('something went wrong'))
  }
api
.route('/')
.get(getUsers)
.post(createUser)


api
.route('/:id')
.get(getUser)
.delete(deleteUser)
.put(updateUser)

module.exports = api;