const database = require("../config/database_connection")

exports.viewTransactions = async (req, res) => {
    database("users")
    .join('transactions', 'users_id', '=', 'users.id')
    .where({email: req.body.email})
    .then(users => {
       response.json(users)
    })
};
exports.deposite = async (req, res) => {
    database("users")
    .where({email: req.body.email})
    .update({balance : + req.body.amount})
    .then(users => {
       response.json(users)
    })
};
exports.withdraw = async (req, res) => {
    database("users")
    .where({email: req.body.email})
    .update({balance : - req.body.amount})
    .first()
    .then(users => {
       response.json(users)
    })
};
exports.transfer = async (req, res) => {
    database("users")
    .where({email: req.body.email})
    .first()
    .then(users => {
       response.json(users)
    })
};