let app = require('express')();
const http = require('node:http').Server(app);
const express = require('express'); 
const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;
app.use(bodyParser.json()); 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

// route 
app.use(require('./routes/usuario'));

app.use(express.json)
http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});