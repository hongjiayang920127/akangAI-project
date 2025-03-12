const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = app.listen(3002, () => {
  console.log('服务器实现运行在端口 3002');
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('新客户端连接到服务器实现');
});

module.exports = app;