const { app, BrowserWindow, globalShortcut } = require('electron')

let mainWindow;

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
  });

  // mainWindow.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/status.html`);
  mainWindow.on('close', _ => {
    mainWindow = null;
  });
});
