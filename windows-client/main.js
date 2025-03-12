const { app, BrowserWindow } = require('electron');
const path = require('path');
const io = require('socket.io-client');

let mainWindow;
let socket;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  // 连接到服务器
  socket = io('http://localhost:3001');

  socket.on('connect', () => {
    console.log('已连接到服务器');
  });

  socket.on('disconnect', () => {
    console.log('与服务器断开连接');
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});