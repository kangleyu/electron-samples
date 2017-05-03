const { electron, app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

app.on('ready', _ => {
  const tray = new Tray(path.join('src', 'trayicon.png'));
  const template = [
    {
      label: 'Wow',
      click: _ => console.log('wow')
    },
    {
      label: 'Awesome',
      click: _ => console.log('Awesome')
    }
  ];
  const contextMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Tooltip Here!');
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });
  
});