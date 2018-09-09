const express = require('express')
const ev = require('email-validator')

const db = require('../../db/register')

const router = express.Router()

function sendError(res, err) {
  console.error('Registration error', err)
  res.status(500).send('server error')
}

router.post('/checkEmailExists/:email', (req, res) => {
  const email = req.params.email
  if (!ev.validate(email)) {
    res.send
  }
  db.checkEmailExists(req.params.email)
    .then(result => {
      if (result.length > 0) res.status(409).send('existing')
      else res.status(200).send('ok')
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/addUser', (req, res) => {
  const user = req.body.user
  !ev.validate(user.email)
  ? res.status(400).send('not a valid email')
  : db.checkEmailExists(user.email)
      .then(users => {
        users.length > 0
        ? res.status(409).send('email is taken')
        : db.addUser(user)
          .then(id => {
            console.log(id)
            res.status(200).send(id[0])
          })
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
