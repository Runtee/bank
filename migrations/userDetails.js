exports.up = function(knex){
    return knex.schema.createTable('userDetails', (table) => {
        table.increments('id')
        table.string('email')
        table.string('password')
        table.string('fullname')
        table.string('age')
        table.string('address')
        table.string('balance')
        table.string('account_number')
    })
 }
 exports.down = function(knex){
    return knex.schema.dropTableIfExists("userDetails")
 }
 