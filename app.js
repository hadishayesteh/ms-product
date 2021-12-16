const express = require('express');
const http = require('http')
const config = require('config');
const app = express();
const {productRouter} = require('./routes')
const mongoose = require('mongoose');
mongoose.connect(config.mongo.database_host, config.mongo.options);
const serverPort = config.server.port
app.use(express.json())
app.use(productRouter)

module.exports = http.createServer(app)

app.listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
