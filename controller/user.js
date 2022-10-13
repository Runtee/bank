const database = require("../config/database_connection");
exports.getUser = async (req, res) => {
    database("users")
    .where({email: req.params.email})
    .then(users => {
       res.json(users)
    })
};


