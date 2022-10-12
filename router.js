const express = require('express');
const authVerfiy = require('./middleware/auth');
const validate = require('./utils/validator'); 
const authController= require('./controller/auth')
const userController = require('./controller/user')
const transactionsController = require('./controller/transactions')


module.exports = (app) => {
    const allRoutes = express.Router();
    const authRoutes = express.Router();
    const transactionsRoutes = express.Router();
    const userRoutes = express.Router();

    // Authentivcation routes 
    allRoutes.use('/auth', authRoutes);
    // register a user
    authRoutes.post('/register', authController.register);
    // login a user
    authRoutes.post('/login', authController.login);
    //
    
    
    // Transaction routes
    allRoutes.use('/transactions',authVerfiy, transactionsRoutes);
    // deposit funds to your wallet
    transactionsRoutes.put('/deposite' ,transactionsController.deposite);
    // withdraw from your wallet
    transactionsRoutes.put('/withdraw', transactionsController.withdraw);
    // transfer money from your wallet to another user
    transactionsRoutes.put('/transfer', transactionsController.transfer);
    //

    // User routes
    allRoutes.use('/user', userRoutes);
    //view user details
    userRoutes.get('/',userController.getUser)


    // logout routes
    allRoutes.post('/logout',authController.logout)

    allRoutes.all('*',  (req, res) => res.status(404).json({'error': 'not found'}))
    app.use("/", allRoutes);
}