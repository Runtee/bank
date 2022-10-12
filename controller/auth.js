const jwtConfig = require('../config/jwt');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');
const database = require("../config/database_connection");



exports.register = async (req, res) => {
   try {
      const email = req.body.email
      const password = req.body.password
      const fullname = req.body.fullname
      const phone = req.body.phone
      const address = req.body.address
      const hashedPassword = await bcrypt.hash(password, 10);
      const checkuser = await database("users").where(function() {
         this.where({'phone': Number(phone)})
         .orWhere({'email': email})
       })
      if (checkuser.length) return res.status(400).json(checkuser)
      const user = await database("users").insert({
         email: email,
         password: hashedPassword,
         fullname: fullname,
         phone: phone,
         address: address,
         account_number: phone
      })
      res.status(200).json(user)
   }

   catch (error) {
      res.status(500).json(error)
   }
};

exports.login = async (req, res) => {
   try{
   const user = await database("users").where({ email: req.body.email }).first()
   if (!user) {
      return res.status(401).json({
         error: "login error"
      })
   }
   bcrypt.compare(req.body.password, user.password)
      .then(isAuthenticated => {
         if (!isAuthenticated) {
            return res.status(401).json({
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
         return res.status(500).json(error)
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

