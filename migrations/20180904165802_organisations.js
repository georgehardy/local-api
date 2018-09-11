exports.up = (knex, Promise) => {
  return knex.schema.createTable('orgs', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('address')
    table.string('lat')
    table.string('lng')
    table.string('avatar')
    table.boolean('active')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('orgs')
}
