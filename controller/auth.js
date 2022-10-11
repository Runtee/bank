const jwtConfig = require('../config/jwt');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const database = require("../config/database_connection");



exports.register = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => {
       return database("users").insert({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email
       })
       .returning(["id", "username"])
       .then(users => {
          res.json(users[0])
       })
       
       .catch(error => next(error))
    })
};

exports.login = async (req, res, next) => {
    database("users")
    .where({email: req.body.email})
    .first()
    .then(user => {
       if(!user){
          res.status(401).json({
             error: "No user by that name"
          })
       }else{
          return bcrypt
          .compare(req.body.password, user.password)
          .then(isAuthenticated => {
             if(!isAuthenticated){
                res.status(401).json({
                   error: "Unauthorized Access!"
                })
             }else{
                const token =  jwt.createToken({ id: user.id });
                return res.status(200).json({
                    access_token: token,
                    token_type: 'Bearer',
                    expires_in: jwtConfig.ttl
                });
             }
          })
       }
    })
};

exports.logout = async (req, res) => { 
    const token = req.token;
    const now = new Date();
    const expire = new Date(req.user.exp);
    const milliseconds = now.getTime() - expire.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    await cache.set(token, token, milliseconds);

    return res.status(200).json({ message: 'Logged out successfully' });
};

