const express = require("express");
const app = express();
const port = 3001;
const amqp = require("amqplib/callback_api");

// Conecct
amqp.connect("amqp://localhost", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    var queue = "diaf queue";

    channel.assertQueue(queue, { durable: false });

    channel.consume(
      queue,
      (message) => {
        console.log(
          `Message [${message.content.toString()}] received froms queue [${queue}]`
        );
      },
      { noAck: true }
    );
    // console.log(`Message [${message}] sent to queue [${queue}]`);
  });
});

app.listen(port, () => {
  console.log(`Subscriber listening at http://localhost:${port}`);
});
