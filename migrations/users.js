exports.up = async function(knex){
    return await knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('email')
        table.string('password')
        table.string('fullname')
        table.string('address')
        table.double('balance').defaultTo(0)
        table.integer('account_number')
        table.integer('phone')
 })}
 exports.down = function(knex){
    return knex.schema.dropTableIfExists("users")
 }