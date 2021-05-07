'use strict';

const io = require('socket.io-client');
// require('dotenv').config();

const HOST = process.env.HOST || 'http://localhost:3000';
const faker = require('faker');

let deliverySystem = io.connect(`${HOST}/caps`);
let vendor = io.connect('http://localhost:3333/vendor')

const store = 'acme-widgets';
const store2 = '1-206-flowers';

const message = process.argv.splice(2)[0];
vendor.emit('delivered', message);
vendor.emit('getAll');

deliverySystem.emit('join', store);
deliverySystem.emit('join', store2);


setInterval(() => {
  let order = {
    storeName: store,
    name: faker.name.findName(),
    orderID: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  };
  deliverySystem.emit('order', order);
}, 5000);

setInterval(() => {
  let order = {
    storeName: store2,
    name: faker.name.findName(),
    orderID: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  };
  deliverySystem.emit('order', order);
}, 5000);

deliverySystem.on('delivered', payload => {
  console.log(`Thank you for delivering order number ${payload.orderID}!`)
});

vendor.on('message', message => {
  console.log(`message received: ${message.payload}`)
  vendor.emit('received', message)
})



// vendor emit get ALL

// queue emits new message

// vendor listens for messages

  // emit a received

// queue listens for received, deletes that message
