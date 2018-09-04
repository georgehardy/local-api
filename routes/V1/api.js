const express = require('express')

const db = require('../../db')

const router = express.Router()

router.get('/users', (req, res) => {
  db.getUsers()
    .then(users => {
      res.json({users: users})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/users/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id)
    .then(user => {
      res.json({user: user})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/users', (req, res) => {
  const newUser = req.body
  db.addUser(newUser)
    .then(user => {
      res.status(200).send('Added ' + newUser.name)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
