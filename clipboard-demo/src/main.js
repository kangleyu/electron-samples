const { 
  electron, 
  app, 
  BrowserWindow, 
  Menu,
  clipboard,
  globalShortcut
} = require('electron');

const STACK_SIZE = 5;
const ITEM_MAX_LENGTH = 20;

let win;

app.on('ready', _ => {
  let stack = [];

  win = new BrowserWindow({
    width: 400,
    height: 400
  });
  const name = app.getName();
  const template = [
    {
      label: name,
      submenu: [{
        label: '<Empty>',
        enabled: false
      }]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  checkClipboardForChange(clipboard, text => {
    stack = addToStack(text, stack);
    console.log('Stack', stack);
    let newMenu = Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack));
    Menu.setApplicationMenu(newMenu);
    registerShortcuts(globalShortcut, clipboard, stack);
  });
});

app.on('will-quit', _ => {
  globalShortcut.unregisterAll();
});

function registerShortcuts(globalShortcut, clipboard, stack) {
  globalShortcut.unregisterAll();
  for (let i = 0; i < STACK_SIZE; i++) {
    globalShortcut.register(`Cmd+Alt+${i+1}`, _ => {
      clipboard.writeText(stack[i]);
    })
  }
}

function formatItem(item) {
  return item && item.length > ITEM_MAX_LENGTH 
    ? item.substr(0, ITEM_MAX_LENGTH) + '...'
    : item;
}

function formatMenuTemplateForStack(clipboard, stack) {
  let menus = stack.map((item, i) => {
    return { 
      label: `Copy: ${formatItem(item)}`,
      click: _ => clipboard.writeText(item)
    }
  });
  console.log('menus', menus);
  return [
    {
      label: 'Clipboard',
      submenu: menus
    }
  ];
}

function addToStack(item, stack) {
  return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack); 
}

function checkClipboardForChange(clipboard, onChange) {
  let cache = clipboard.readText();
  let latest;
  setInterval(_ => {
    latest = clipboard.readText();
    if (latest !== cache) {
      cache = latest;
      onChange(cache);
    }
  }, 1000);
}