'use strict';

require('dotenv').config();
require('./dbcon.js').connect();

const express = require('express');
const server = express();

const testController = require('./controllers/test.js');
const newsController = require('./controllers/news.js');

server.use('/test', testController);
server.use('/news', newsController);

const port = process.env.PORT | 3000;

server.listen(port, () => {
    console.log(`Server started at ${port}`);
})
