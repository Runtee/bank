exports.up = function(knex){
    return knex.schema.createTable('transations', (table) => {
        table.increments('id')
        table.string('type')
        table.string('from')
        table.string('to')
        table.integer('user_id')
    })
 }
 exports.down = function(knex){
    return knex.schema.dropTableIfExists("transations")
 }
 