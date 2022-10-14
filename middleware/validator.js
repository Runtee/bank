const { check, validationResult } = require("express-validator");

const userSignInValidationRules = () => {
    return [
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("password", "Invalid password").not().isEmpty().isLength({ min: 8 }),
    ];
};

const userSignUpValidationRules = () => {
    return [
        check("fullname", "Please enter your fullname").not().isEmpty(),
        check("address", "Please enter your address").not().isEmpty(),
        check("email", "Please enter a valid email address")
            .not()
            .isEmpty()
            .isEmail(),
        check(
            "password",
            "password must contain at least 1 uppercase and lowercase  letter, a symbol and a number and must not be less than 8"
        )
            .not()
            .isEmpty()
            .isStrongPassword({
                minUppercase: 1,
                minNumbers: 1,
                minLowercase: 1,
                minLength: 8,
                minSymbols: 1,
            }),
        check("phone", "your phone number is not valid, must be 11 digits").not().isEmpty().isNumeric().isLength({ min: 11, max: 11 }),

    ];
};

const amountCheckValidationRules = () => {
    return [
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("amount", "Please enter a valid amount").not().isEmpty().isNumeric({ no_symbols: true }),
    ];
};

const transferValidationRules = () => {
    return [
        check("email", "Invalid email").not().isEmpty().isEmail(),
        check("amount", "Please enter a valid amount").not().isEmpty().isNumeric({ no_symbols: true }),
        check("peer_account_number", "Please enter a valid account number").not().isEmpty().isNumeric({ no_symbols: true }),
    ];
};

const showUserValidationRules = () => {
    return [
        check("email", "Invalid email").not().isEmpty().isString(),
    ];
};

const validateSignin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        return res.status(400).json(messages);
    }
    next();
};

const validateSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        return res.status(400).json(messages);
    }
    next();
};
const validateAmount = (req, res, next) => {
    const errors = amountCheckValidationRules(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        return res.status(400).json(messages);

    }
    next();
};
const validateTransfer = (req, res, next) => {
    const errors = transferValidationRules(req);
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        res.status(400).json(messages);

    }
    next();
};
const validateShowUser = (req, res, next) => {
    const errors = showUserValidationRules(req);
    if (!errors.isEmpty()) {
        var messages = [];
        errors.array().forEach((error) => {
            messages.push(error.msg);
        });
        return res.status(400).json(messages);

    }
    next();
};

module.exports = {
    userSignInValidationRules,
    userSignUpValidationRules,
    amountCheckValidationRules,
    transferValidationRules,
    showUserValidationRules,
    validateSignUp,
    validateAmount,
    validateTransfer,
    validateShowUser,
    validateSignin,
};
