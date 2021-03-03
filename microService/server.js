const express = require('express');
const cors = require('cors');

const router = require('./routes');
const {PORT} = require('../config/config');
const {createMongoDbConnection} = require('../Db/config');

const app = express();

app.use(express.static(__dirname + '/public'));
/**
 * ? =============== MIDDLEWARE==========
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// app.use(validator());

/**
 * ? =============== ROUTERS==========
 */

app.use('/', router);

/**
 * ? =============== DATABASE CONNECTION==========
 */

try {
  createMongoDbConnection();
} catch (error) {
  console.log('error in database connection ' + error);
}

/**
 * ? =============== Server LISTENER==========
 */

app.listen(PORT, function () {
  console.log(`Http service is running on port ${PORT}`);
});
