'use strict';

const events = require('../../events.js');


events.on('pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`)
  }, 1000);
  events.emit('in-transit', payload);
});

events.on('in-transit', payload => {
  setTimeout(() => {
    console.log(`DRIVER delivered order number: ${payload.orderID}`)
  }, 1000);
  events.emit('delivered', payload);
});
