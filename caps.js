'use strict';

const io = require('socket.io')(3000);

const deliverySystem = io.of('/caps')

deliverySystem.on('connection', socket => {
  console.log('client:', socket.id);

  socket.on('order', payload => {
    console.log('EVENT:', {
      event: 'pickup',
      time: new Date,
      payload,
    });
    deliverySystem.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    console.log('EVENT:', {
      event: 'in-transit',
      time: new Date,
      payload,
    });
    deliverySystem.emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    console.log('EVENT:', {
      event: 'delivered',
      time: new Date,
      payload,
    });
    deliverySystem.emit('delivered', payload);
  });

});



