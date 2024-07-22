let app = require('express')(); // manager function 
const http = require('node:http').Server(app);
const express = require('express'); // manager data
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;
app.use(bodyParser.json()); // o app.use(express.json());

//  allow access on origins
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

// route 
app.use(require('./routes/cliente'));

app.use(express.json)
http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});