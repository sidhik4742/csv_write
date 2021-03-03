const {getMongoDbConnection} = require('../../Db/config');
const COLLECTIONS = require('../../Db/DbCollections/collections');
const {saltRounds} = require('../../config/config');

module.exports.findUser = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await getMongoDbConnection();
      const collection = db.collection(COLLECTIONS.userDetails);
      //console.log(collection,"collection");
      const response = await collection.find({email: email}).toArray();
      console.log(response, 'res=====================');
      if (response.length === 0) {
        return resolve({msg: 'User not registered', status: false});
      } else {
        return resolve({msg: response, status: true});
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.insertUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const db = await getMongoDbConnection();
      const collection = db.collection(COLLECTIONS.userDetails);
      const response = await collection.insertOne({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        email: data.email,
      });
      console.log(response);
      if (response.insertedCount) return resolve(response);
      return reject({msg: 'User not inserted'});
    } catch (error) {
      reject(error);
    }
  });
};
