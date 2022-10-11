exports.getUser = async (req, res) => {
    database("users")
    .where({email: req.body.email})
    .then(users => {
       response.json(users)
    })
};


