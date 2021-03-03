const {body, validationResult} = require('express-validator');

module.exports.addUserRule = () => {
  return [
    //first name must be between 8 to 100
    body('firstName')
      .notEmpty()
      .isString()
      .isLength({min: 3})
      .withMessage('Is less than 5 characters'),
      //last name must be between 8 to 100
    body('lastName')
      .notEmpty()
      .isString()
      .isLength({min: 2})
      .withMessage('Is less than 5 characters'),
    body('email').notEmpty().isEmail().withMessage('Is not an email'),
    //age must be between 8 to 100
    body('age')
      .notEmpty()
      .isInt({min: 8, max: 100})
      .withMessage('age should be between 8 to 99'),
  ];
};

module.exports.validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log('validatorError', errors);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({[err.param]: err.msg}));

  return res.json({
    errors: extractedErrors,
  });
};
