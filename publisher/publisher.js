const express = require("express");
const app = express();
const port = 3000;
const amqp = require("amqplib/callback_api");

// Conecct
amqp.connect("amqp://localhost", (connectionError, connection) => {
  if (connectionError) throw connectionError;

  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;

    var queue = "diaf queue";
    var message = `Diaf Bro at ${Date.now().toLocaleString()}`;

    channel.assertQueue(queue, { durable: false });

    setInterval(() => {
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Message [${message}] sent to queue [${queue}] ${Date.now().toLocaleString()}`);
    }, 1500);

    process.on("beforeExit", () => {
      channel.close();
      connection.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Publisher listening at http://localhost:${port}`);
});
