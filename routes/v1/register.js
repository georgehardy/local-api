const express = require('express')
const ev = require('email-validator')

const db = require('../../db/register')

const router = express.Router()

function sendError (res, err) {
  console.error('Registration error', err)
  res.status(500).send({error: 'Woops something went wrong...'})
}

router.post('/addUser', (req, res) => {
  const user = req.body.user
  !ev.validate(user.email)
    ? res.status(200).send({error: 'You must enter a valid email address.'})
    : db.checkEmailExists(user.email)
      .then(users => {
        users.length > 0
          ? res.status(200).send({error: 'This email address has already been used.'})
          : db.addUser(user)
            .then(id => {
              res.status(201).send(id[0])
            })
            .catch(err => sendError(res, err))
      })
      .catch(err => sendError(res, err))
})

router.post('/addOrg', (req, res) => {
  db.addOrg(req.body.org)
    .then(id => {
      db.addRole(req.body.userId, id[0].id, 9)
        .then(() => res.status(201).send(id[0]))
        .catch(err => sendError(res, err))
    })
    .catch(err => sendError(res, err))
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getUser(id)
    .then(user => {
      res.json({user: user})
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
