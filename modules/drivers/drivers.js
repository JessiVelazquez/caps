'use strict';

const { Socket } = require('socket.io-client');

const io = require('socket.io-client');

const HOST = process.env.HOST || 'http://localhost:3000';

let deliverySystem = io.connect(`${HOST}/caps`);

const store = 'delivery driver';

deliverySystem.emit('join', store);

deliverySystem.on('order', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`)
    deliverySystem.emit('in-transit', payload);
  }, 1500);
});

deliverySystem.on('in-transit', payload => {
  setTimeout(() => {
    console.log(`DRIVER delivered order number: ${payload.orderID}`)
    deliverySystem.emit('delivered', payload);
  }, 3000);
});


