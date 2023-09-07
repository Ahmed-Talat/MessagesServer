const { messageRouter } = require('./messagesRouter')

const bodyParser = require('body-parser');
const express = require('express');
const server = express();

server.use(bodyParser.json());

server.use('/messages', messageRouter)

server.listen(3000, () => {
    console.log('listenning on port 3000');
});
