'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

const deliverySystem = io.of('/caps')

io.on('connection', socket => {
  console.log('connected user:', socket.id);
});

deliverySystem.on('connection', socket => {
  console.log('client:', socket.id);

  socket.on('join', room => {
    console.log('room name:', room);
    socket.join(room);
  });

  socket.on('order', payload => {
    logger('pickup', payload);
    // console.log('EVENT:', {
    //   event: 'pickup',
    //   time: new Date,
    //   payload,
    // });
    deliverySystem.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    logger('pickup', payload);
    //========global emit==========\\
    deliverySystem.emit('in-transit', payload);
    //=======emit just to those who care======\\
    deliverySystem.to(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    logger('pickup', payload);
    //======this is global emit=========\\
    deliverySystem.emit('delivered', payload);
    //=======this is emit just to those who care==========\\
    deliverySystem.to(payload.store).emit('delivered', payload);
  });

});

//==========This is a helper function - supplies functionality within this file===========\\
//==========Replaces the object declaration in the socket.on functions above - see 'order' event==============\\
function logger(event, payload) {
  let timestamp = new Date();
  console.log({ timestamp, event, payload });
};
