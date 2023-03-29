const port = 3003;

//Vai fazer o parser no corpo da requisição
const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const allowCors = require("./cors");
const queryParser = require("express-query-int");

// pra toda requisição que chegar use o bodyParser pra interpretar quando vier no formato urlcoded
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);
server.use(queryParser());

server.listen(port, function () {
  console.log(`Backend is running on port ${port}`);
});

module.exports = server;
