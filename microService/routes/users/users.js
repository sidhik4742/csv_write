const router = require('express').Router();
const controller = require('../../../libs/controllers/index');
const {addUserRule, validate} = require('../../../libs/middleware/validator');
const {csvUploader} = require('../../../libs/middleware/fileUploader');

// router.post('/login', (req, res) => {
//   console.log(req.body);
//   res.json({status: 200, msg: 'success'});
// });

router.post('/addUser', addUserRule(), validate, controller.addUser);
router.post('/upload', csvUploader, controller.uploadFile);

module.exports = router;
