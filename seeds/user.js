const bcrypt = require('bcrypt');
exports.seed = async function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    id: 1,
                    email: 'nnoi@email.com',
                    password: await bcrypt.hash('password1', 10),
                    fullname:'nnoi okio',
                    address: 'No 4 lagos street',
                    balance: 100,
                    account_number: 0123475311
                },
                {
                    id: 2,
                    email: 'nakaz@email.com',
                    password: await bcrypt.hash('password2', 10),
                    fullname: 'Nakaz obi',
                    address: 'No 3 nike road',
                    balance: 50,
                    account_number: 3761036283
                },
                {
                    id: 3,
                    email: 'jaywon@email.com',
                    password: await bcrypt.hash('password3', 10),
                    fullname:'jaywon oluwa',
                    address: 'Main island',
                    balance: 456789,
                    account_number: 1753643678
                },
                {
                    id: 4,
                    email: 'john@email.com',
                    password: await bcrypt.hash('password4', 10),
                    fullname: 'john paul',
                    address: 'main road',
                    balance: 0,
                    account_number: 097432167
                }
            ]);
        });
};