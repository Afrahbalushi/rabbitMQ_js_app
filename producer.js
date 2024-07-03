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

  
    const tasks = ['Read', 'Eat', 'Sleep', 'Code', 'Repeat'];
    tasks.forEach(task => {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(task));
      console.log(`Sent: ${task}`);
    });
  });


  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
