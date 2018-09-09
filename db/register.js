const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  checkEmailExists,
  addUser,
  getUser
}

function checkEmailExists (email, db = connection) {
  console.log('checking if', email, 'exists.')
  return db('users').where('email', email)
}

function getUser (id, db = connection) {
  console.log('getting user ', id)
  return db('users').where('id', id).first()
}

function addUser (user, db = connection) {
  console.log('inserting new user: ', user)
  return db('ussers')
    .insert(user)
    .returning(['id'])
}
