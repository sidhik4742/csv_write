const amqp = require('amqplib/callback_api');

const {
  rabbitMqUrl,
  successQueue,
  parking_lot_queue,
} = require('../../constants/constants');

module.exports.maileServiceBroker = (file) => {
  try {
    return new Promise((resolve, reject) => {
      amqp.connect(rabbitMqUrl, function (error0, connection) {
        if (error0) {
          throw error0;
        }
        connection.createChannel(function (error1, channel) {
          if (error1) {
            throw error1;
          }
          var queue = successQueue;
          var msg = file;

          // channel.assertQueue(queue, {
          //   durable: false,
          // });

          channel.sendToQueue(queue, Buffer.from(msg));
          console.log('message is', msg);
          resolve(true);
        });

        setTimeout(function () {
          connection.close();
          process.exit(0);
        }, 500);
      });
    }).catch((error) => {
        console.log("sending failed");
    });
  } catch (error) {
      console.log("something went wrong");
  }
};
