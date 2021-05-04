'use strict';

require('dotenv').config();
const faker = require('faker');
const events = require('../../events.js');

const store = process.env.STORE;

setInterval(() => {
  let order = {
    storeName: store,
    name: faker.name.findName(),
    orderID: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  };
  events.emit('order', order);
}, 5000);

events.on('delivered', payload => {
  console.log(`Thank you for your order! Order number was ${payload.orderID}`);
})
