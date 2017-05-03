const { electron, app, BrowserWindow, Menu } = require('electron');

let win;

app.on('ready', _ => {
  win = new BrowserWindow({
    width: 400,
    height: 400
  });

  const name = app.getName();
  const template = [
    {
      label: name,
      submenu: [{
        label: `About ${name}`,
        click: _ => {
          console.log('clicked');
        },
        role: 'about'
      }, {
          type: 'separator'
      }, {
        label: 'Quit',
        click: _ => {
          app.quit();
        },
        accelerator: 'Cmd+Q'
      }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});