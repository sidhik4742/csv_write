const router = require('express').Router();

router.use('/users',require('./users/users'))

module.exports = router;
