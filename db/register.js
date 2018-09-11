const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  checkEmailExists,
  addUser,
  getUser,
  addOrg,
  addRole
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
  user.active = true
  console.log('inserting new user: ', user)
  return db('users')
    .insert(user)
    .returning(['id'])
}

function addRole (userId, orgId, role, db = connection) {
  console.log('Adding role [', role, '] to userId [', userId, '] for orgId [', orgId, ']')
  return db('roles')
    .insert({
      userId,
      orgId,
      role
    })
}

function addOrg (org, db = connection) {
  org.active = true
  return db('orgs')
    .insert(org)
    .returning(['id'])
}
