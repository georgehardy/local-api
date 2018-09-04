exports.up = (knex, Promise) => {
  return knex.schema.createTable('organisations', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('unit')
    table.string('address')
    table.string('suburb')
    table.string('city')
    table.integer('postcode')
    table.string('avatar')
    table.boolean('active')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('organisations')
  
}
