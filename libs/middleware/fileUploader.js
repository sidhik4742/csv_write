const multer = require('multer');
const path = require('path');

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + path.join('../../../microService/public/csv/'));
  },
  filename: function (req, file, callback) {
    let csvUrl = file.fieldname + Date.now() + '.csv';
    req.locals = '/csv/' + csvUrl;
    callback(null, csvUrl);
  },
});

module.exports.csvUploader = multer({storage: storage1}).any();