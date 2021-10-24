const { check, validationResult } = require('express-validator');

exports.userValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(422).json({ success: false, error: error });
    }
    next();
}

exports.loginValidator = [
    check('email').trim().not().isEmpty().withMessage('Email is required!').isEmail().withMessage("Enter the valid Email"),
    check('password').trim().not().isEmpty().withMessage('password is required!').isLength({ min: 8, max: 20 }).withMessage("password length must be atleast 8 characters")
];