const jwtConfig = require('../config/jwt');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const database = require("../config/database_connection");



exports.register = async (req, res) => {
   try {
      const email = req.body.email
      const password = req.body.password
      const fullname = req.body.fullname
      const age = req.body.age
      const address = req.body.address
      const balance = 0
      const account_number = req.body.account_number
      const hashedPassword = await bcrypt.hash(password, 10);
      const checkuser = await database("users").where({ email: email })
      if (checkuser) return res.status(400).json('user alreay exist')
      const user = await database("users").insert({
         email: email,
         password: hashedPassword,
         fullname: fullname,
         age: age,
         address: address,
         balance: balance,
         account_number: account_number
      })
      res.status(200).json(user)
   }

   catch (error) {
      next(error)
   }
};

exports.login = async (req, res) => {
   try{
   const user = await database("users").where({ email: req.body.email }).first()
   if (!user) {
      res.status(401).json({
         error: "login error"
      })
   }
   bcrypt.compare(req.body.password, user.password)
      .then(isAuthenticated => {
         if (!isAuthenticated) {
            res.status(401).json({
               error: "login error"
            })
         } else {
            const token = jwt.createToken({ id: user.id });
            return res.status(200).json({
               access_token: token,
               token_type: 'Bearer',
               expires_in: jwtConfig.ttl
            });
         }
      })}
      catch(error){
         res.status(500).json(error)
      }
};

exports.logout = async (req, res) => {
   try{
   const token = req.token;
   const now = new Date();
   const expire = new Date(req.user.exp);
   const milliseconds = now.getTime() - expire.getTime();
   /* ----------------------------- BlackList Token ---------------------------- */
   await cache.set(token, token, milliseconds);

   return res.status(200).json({ message: 'Logged out successfully' });
   }
   catch(err){
      res.status(500).json(err)
   }
};

