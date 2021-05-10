'use strict';

const PORT = process.env.QUEUE_SERVER || 3333;
const uuid = require('uuid').v4;
const io = require('socket.io')(PORT);

const queue = {
  messages: {}
};

// const HOST = process.env.HOST || 'http://localhost:3000';

let vendor = io.of('/vendor');

vendor.on('connection', socket => {

  socket.on('delivered', payload => {
    let id = uuid();
    queue.messages[id] = payload;
    console.log('current message queue', queue);
    vendor.emit('delivered', {id, payload});
  });

  socket.on('getAll', () => {
    console.log('GET ALL-------');
    Object.keys(queue).forEach(id => {
      vendor.emit('message', { id, payload: queue.messages[id] })
    })
  });

  socket.on('received', message => {
    delete queue.messages[message.id];
    console.log('message deleted');
  });

})