'use strict';

const io = require('socket.io-client');
require('dotenv').config();

const HOST = process.env.HOST || 'http://localhost:3000';
const faker = require('faker');

let deliverySystem = io.connect(`${HOST}/caps`);

const store = process.env.STORE;

setInterval(() => {
  let order = {
    storeName: store,
    name: faker.name.findName(),
    orderID: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  };
  deliverySystem.emit('order', order);
}, 5000);

deliverySystem.on('delivered', payload => {
  console.log(`Thank you for your order! Order number was ${payload.orderID}`)
});

