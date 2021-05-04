'use strict';

const events = require('./events.js');

require('./modules/drivers/drivers.js');
require('./modules/vendors/vendor.js');

events.on('order', payload => {
  console.log('EVENT:', {
    event: 'pickup',
    time: new Date,
    payload,
  });
  events.emit('pickup', payload);
});

events.on('in-transit', payload => {
  console.log('EVENT:', {
    event: 'in-transit',
    time: new Date,
    payload,
  });
});

events.on('delivered', payload => {
  console.log('EVENT:', {
    event: 'delivered',
    time: new Date,
    payload,
  });
});