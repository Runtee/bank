exports.getUser = async (req, res) => {
    database("users")
    .where({email: req.query.email})
    .then(users => {
       response.json(users)
    })
};


