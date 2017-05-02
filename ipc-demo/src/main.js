const { app, BrowserWindow, ipcMain } = require('electron')

const countdown = require('./countdown');

const windows = [];

app.on('ready', _ => {

  [1, 2, 3].forEach(_ => {
    let win = new BrowserWindow({
      width: 800,
      height: 400
    });
    
    win.loadURL(`file://${__dirname}/countdown.html`);

    // mainWindow.webContents.openDevTools()

    win.on('closed', _ => {
      win = null;
    });

    windows.push(win);
  });
});

ipcMain.on('countdown-start', _ => {
  countdown(count => {
    windows.forEach(win => {
      win.webContents.send('countdown', count);
    });
  });
});