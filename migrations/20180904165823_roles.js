exports.up = (knex, Promise) => {
  return knex.schema.createTable('roles', table => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.integer('org_id').references('organisations.id')
    table.integer('role')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('roles')
}
