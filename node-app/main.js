'use strict';

require('dotenv').config();
require('./dbcon.js').connect();

const express = require('express');
const server = express();

const newsController = require('./controllers/news.js');

server.use('/news-api', newsController);

const port = process.env.PORT | 3000;

server.listen(port, () => {
    console.log(`Server started at ${port}`);
})
