exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'George', lastName: 'Hardy', email: 'ghardydev@gmail.com', password: null, avatar: null, active: true}
      ])
    })
}
