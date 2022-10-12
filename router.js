const express = require('express');
const authVerfiy = require('./middleware/auth');
const authController = require('./controller/auth')
const userController = require('./controller/user')
const transactionsController = require('./controller/transactions')
const { userSignInValidationRules,
    userSignUpValidationRules,
    amountCheckValidationRules,
    transferValidationRules,
    showUserValidationRules,
    validateSignUp,
    validateAmount,
    validateTransfer,
    validateShowUser,
    validateSignin, } = require('./middleware/validator')

module.exports = (app) => {
    const allRoutes = express.Router();
    const authRoutes = express.Router();
    const transactionsRoutes = express.Router();
    const userRoutes = express.Router();

    // Authentivcation routes 
    allRoutes.use('/auth', authRoutes);
    // register a user
    authRoutes.post('/register', [userSignUpValidationRules(), validateSignUp], authController.register);
    // login a user
    authRoutes.post('/login', [userSignInValidationRules(), validateSignin], authController.login);
    //


    // Transaction routes
    allRoutes.use('/transactions', authVerfiy, transactionsRoutes);
    // deposit funds to your wallet
    transactionsRoutes.put('/deposite', [amountCheckValidationRules(), amountCheckValidationRules], transactionsController.deposite);
    // withdraw from your wallet
    transactionsRoutes.put('/withdraw', [amountCheckValidationRules(), validateAmount], transactionsController.withdraw);
    // transfer money from your wallet to another user
    transactionsRoutes.put('/transfer', [transferValidationRules(), validateTransfer], transactionsController.transfer);
    //

    // User routes
    allRoutes.use('/user', userRoutes);
    //view user details
    userRoutes.get('/', [showUserValidationRules(), validateShowUser], userController.getUser)


    // logout routes
    allRoutes.post('/logout', authController.logout)

    allRoutes.all('*', (req, res) => res.status(404).json({ 'error': 'not found' }))
    app.use("/", allRoutes);
}