const {userLogin, userSignup} = require('./index');
const {findUser, insertUser} = require('../../libs/Db/userAuth');
const {mailService} = require('../helpers/mailService');
const {csvTOJSON} = require('../../libs/helpers/csvParser');

module.exports.addUser = async (req, res) => {
  try {
    let result = await findUser(req.body.email);
    console.log(result,"add user===================");
    if (result.status) {
      return res.json({
        status: 409,
        msg: 'User with the same email already exists',
      });
    } else {
      let result = await insertUser(req.body);
      console.log(result.ops);
      return res.json({
        status: 200,
        msg: 'User register successfully',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.uploadFile = async (req, res) => {
  try {
    let result = await csvTOJSON(req.locals);
    console.log(result);
    res.json({status: 200, msg: result});
  } catch (error) {
    console.log(error);
  }
};
