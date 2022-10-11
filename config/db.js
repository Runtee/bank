const connection = require('knex');
// module.exports = (knex)=>{
const knex = connection({
    client: 'mysql2',
    connection: {
        host : 'localhost',
        user : 'root',
        password : 'Nonso0803.',
        database : 'bank'
    }
});

// knex.schema.createTable('users', (table) => {
//     table.increments('id')
//     table.string('email')
//     table.string('password')
//     table.string('fullname')
//     table.string('age')
//     table.string('address')
//     table.string('balance')
//     table.string('account_number')
// })
//     .then((users) => console.log(users))
//     .catch((err)=> console.log(err));
// knex.schema.createTable('userDetails', (table) => {
//     table.increments('id')
//     table.string('fullname')
//     table.string('age')
//     table.string('address')
//     table.string('balance')
//     table.string('account_number')
//     table.foreign('user_id').references('id').inTable('users');
// })
// .then((userDetails) => console.log(userDetails))
// .catch((err)=> console.log(err));
// knex.schema.createTable('transations', (table) => {
//     table.increments('id')
//     table.string('type')
//     table.string('from')
//     table.string('to')
//     table.integer('user_id')
//     // table.foreign('user_details_id').references('id').inTable('userDetails');
// })
// .then((transations) => console.log(transations))
// .catch((err)=> console.log(err));
// }
knex.schema.table('transations', table => {
    table.foreign('user_id').references('id').inTable('users');
    // table.string('first_name').alter()
})
.then((transations) => console.log(transations))
.catch((err)=> console.log(err));
