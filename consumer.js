const amqp = require('amqplib/callback_api');

const QUEUE_NAME = 'tasks';

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    throw err;
  }
  
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }

    channel.assertQueue(QUEUE_NAME, { durable: false });

    console.log(`Waiting for messages in ${QUEUE_NAME}. To exit press CTRL+C`);

    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        console.log(`Received: ${msg.content.toString()}`);
      
        
      }
    });
  });
});
