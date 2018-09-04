exports.up = (knex, Promise) => {
  return knex.schema.createTable('roles', table => {
    table.increments('id').primary()
    table.interger('user_id').references('users.id')
    table.interger('org_id').references('organisations.id')
    table.interger('role')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('roles')
}
