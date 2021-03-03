const mongoClient = require('mongodb').MongoClient;
const {MONGO_URI} = require("../config/config")
let objMongoConnection;
module.exports.createMongoDbConnection = async function createMongoDbConnection() {
  try {
    objMongoConnection = await mongoClient.connect(
      MONGO_URI,
      {
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to database');
  } catch (error) {}
};
module.exports.getMongoDbConnection = async function getMongoDbConnection() {
  try {
    return await objMongoConnection.db('userDetails');
  } catch (error) {}
};
