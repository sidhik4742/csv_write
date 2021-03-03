const path = require('path');
const fs = require('fs');
const neatCsv = require('neat-csv');
const json2csv = require('json2csv').parse;

const {findUser} = require('../../libs/Db/userAuth');
const {maileServiceBroker} = require('../../libs/helpers/mailService');

module.exports.csvTOJSON = (relativePath) => {
  console.log('started');
  try {
    return new Promise(async (resolve, rejects) => {
      fields = ['Firstname', 'Lastname'];
      let csvpath = path.join(
        __dirname,
        '../../microService/public' + relativePath
      );

      let data = fs.readFileSync(csvpath);
      // if (result.err) {
      //   console.error(err);
      //   return;
      // }
      let csvToJsonData = await neatCsv(data);
      console.log(csvToJsonData[0].Email);
      let result = await findUser(csvToJsonData[0].Email);
      console.log(result, 'result=================');
      if (result.status) {
        data = [
          {
            Firstname: result.msg[0].firstName,
            Lastname: result.msg[0].lastName,
          },
        ];
        write(csvpath, fields, data);
        let sendMsg = await maileServiceBroker(csvpath);
      } else {
        console.log(result.msg);
      }
      resolve('completed');
    }).catch((error) => {
      console.log(error);
    });
  } catch (error) {}
};

const write = async (filename, fields, data) => {
  try {
    // output file in the same folder
    // const filename = path.join(__dirname, 'CSV', `${fileName}`);
    let rows;
    // If file doesn't exist, we will create new file and add rows with headers.
    if (!fs.existsSync(fields)) {
      rows = json2csv(data, {header: true});
    } else {
      // Rows without headers.
      rows = json2csv(data, {header: false});
    }

    // Append file function can create new file too.
    fs.appendFileSync(filename, rows);
    // Always add new line if file already exists.
    fs.appendFileSync(filename, '\r\n');
  } catch (error) {
      console.log(error);
  }
};
