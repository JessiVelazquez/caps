'use strict';

const express = require('express');
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000'

const socket = io.connect(`${SERVER_URL}/caps`);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = 'jessi store';

app.post('/order', (req, res) => {
  let order = req.body || {
    storeName: store,
    name: faker.name.findName(),
    orderID: faker.datatype.uuid(),
    address: faker.address.streetAddress()
  }

  socket.emit('order', order);
  res.status(200).send('your order has been received');
});

app.listen(PORT, () => {
  console.log(`API Server is up on ${PORT}`)
});