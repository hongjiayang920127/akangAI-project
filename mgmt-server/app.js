const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const socketIO = require('socket.io');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 路由配置
app.use('/api/asr', require('./routes/asr'));
app.use('/api/llm', require('./routes/llm'));
app.use('/api/tts', require('./routes/tts'));

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器错误');
});

// 启动服务器
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

// WebSocket配置
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Socket连接处理
io.on('connection', (socket) => {
  console.log('新客户端连接');
  
  socket.on('disconnect', () => {
    console.log('客户端断开连接');
  });
});

module.exports = app;