'use strict';

const { Socket } = require('socket.io-client');

const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';

let deliverySystem = io.connect(`${HOST}/caps`);

deliverySystem.on('pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`)
  }, 1000);
  deliverySystem.emit('in-transit', payload);
});

deliverySystem.on('in-transit', payload => {
  setTimeout(() => {
    console.log(`DRIVER delivered order number: ${payload.orderID}`)
  }, 1000);
  deliverySystem.emit('delivered', payload);
});


